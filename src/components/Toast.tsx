import { useEffect, useRef, useState } from "react";
import { BadgeCheckIcon, XIcon, ExclamationCircleIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from 'framer-motion';

import { RenderConditional } from "./RenderConditional";
import { useNotification } from "../hooks/useNotification";

export function Toast() {
  const { 
    isFinishCloseNotification, 
    notificationClose, 
    notificationMessage, 
    typeNotification,
    delayValue
  } = useNotification();

  const timeOutCloseToast = useRef<NodeJS.Timeout | null>(null);
  const [onMouseInNotification, setOnMouseInNotification] = useState(false);

  useEffect(() => {
    if ((!typeNotification && isFinishCloseNotification) || onMouseInNotification) {
      return;
    }

    timeOutCloseToast.current = setTimeout(() => {
      notificationClose();
    }, delayValue || 2500);

    return () => clearTimeout(timeOutCloseToast.current as NodeJS.Timeout);
  }, [notificationClose, typeNotification, delayValue, isFinishCloseNotification, onMouseInNotification]);


  return (
    <AnimatePresence>
      {
        typeNotification && (
        <div className="absolute h-screen w-full overflow-hidden">
          <div 
            className="fixed cursor-pointer sm:top-6 sm:p-0 sm:-translate-x-0 w-full sm:w-96 sm:left-auto sm:bottom-auto p-4 sm:right-8 z-50 bottom-2 left-1/2 transform -translate-x-1/2"
            onMouseEnter={() => setOnMouseInNotification(true)}
            onMouseLeave={() => setOnMouseInNotification(false)}
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, translateX: 500 }}
              animate={{ opacity: 1, translateX: 1 }}
              transition={{ duration: 0.8 }}
              exit={{ x: 300, opacity: 0 }}
              className="flex items-center bg-white h-16 sm:w-96 w-full p-4 rounded-md shadow-md relative"
            >
              <RenderConditional 
                condition={typeNotification === 'ERROR'}
                component={<ExclamationCircleIcon className="h-8 w-8 text-red-600" />}
              />

              <RenderConditional 
                condition={typeNotification === 'SUCCESS'}
                component={<BadgeCheckIcon className="h-8 w-8 text-green-500" />}
              />

              <span className="text-md pr-6 ml-2 w-full text-gray-800 text-ellipsis overflow-hidden ...">
                {notificationMessage}
              </span>

              <div
                className="absolute right-4" 
                onClick={notificationClose}
              >
                <XIcon className="h-6 w-6 text-gray-500 cursor-pointer font-bold" />
              </div>
            </motion.div>
          </div>
        </div>
      )}
  </AnimatePresence>
  )
}