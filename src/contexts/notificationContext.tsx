import { createContext, useState, useMemo, useCallback, ReactNode, useRef } from 'react';

type NotificationParams = {
  message?: string;
  fn?: () => void;
}

type NotificationData = {
  typeNotification: '' | 'SUCCESS' | 'ERROR',
  notificationMessage: string;
  notificationSuccess: (data?: NotificationParams) => void;
  notificationError: (data?: NotificationParams) => void;
  notificationClose: () => void;
  isFinishCloseNotification: boolean;
  delayValue: number;
}

export const notificationContext = createContext({} as NotificationData);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const timeOutActionCloseToast = useRef<NodeJS.Timeout | null>(null);

  const [typeNotification, setTypeNotification] = useState<'' | 'SUCCESS' | 'ERROR'>('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isFinishCloseNotification, setIsFinishCloseNotification] = useState(true);
  const [delayValue] = useState(2500);

  const notificationSuccess = useCallback((data?: NotificationParams) => {
    setTypeNotification('SUCCESS');
    setNotificationMessage(data?.message || 'Solicitação realizada com sucesso');
    setIsFinishCloseNotification(true);
    
    if (!isFinishCloseNotification && data.fn) {
      timeOutActionCloseToast.current = setTimeout(() => {
        data.fn();
      }, delayValue - 300 || 500);
    }

  }, [isFinishCloseNotification, delayValue]);

  const notificationError = useCallback((data?: NotificationParams) => {
    setTypeNotification('ERROR');
    setNotificationMessage(data?.message || 'Ocorreu um erro em sua solicitação, tente novamente');
    setIsFinishCloseNotification(true);

    if (!isFinishCloseNotification && data?.fn) {
      timeOutActionCloseToast.current = setTimeout(() => {
        data.fn();
      }, delayValue - 300 || 500);
    }
  }, [isFinishCloseNotification, delayValue]);

  const notificationClose = useCallback(() => {
    setTypeNotification('');
    setNotificationMessage('');
    setIsFinishCloseNotification(false); 
  }, []);

  const value = useMemo(() => {
    return {
      typeNotification,
      notificationMessage,
      notificationSuccess,
      notificationError,
      notificationClose,
      isFinishCloseNotification,
      delayValue,
    }
  }, [
      isFinishCloseNotification, 
      notificationClose,
      notificationError,
      notificationSuccess,
      notificationMessage,
      delayValue,
      typeNotification,
    ]);

  return (
    <notificationContext.Provider value={value}>
      {children}
    </notificationContext.Provider>
  )
}