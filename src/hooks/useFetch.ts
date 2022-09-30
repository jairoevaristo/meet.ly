import { useCallback, useEffect, useState } from "react";
import { IApiResponse } from "../types/IApiResponse";
import { useNotification } from "./useNotification";

type Options = {
  enableFetchOnMount: boolean;
}

type UseFetchData = {
  data: any;
  loading: boolean,
  refetch: (params?: any) => Promise<void>;
}

export function useFetch<T>(fn?: () => Promise<T | undefined>, options?: Options): UseFetchData {
  const { notificationSuccess, notificationError } = useNotification();

  const [response, setResponse] = useState<T>(undefined);
  const [loading, setLoading] = useState(false);

  const refetch = useCallback(async (params?: any) => {
    try {
      setLoading(true);
      const data = await fn();
      setResponse(data);
      notificationSuccess({ message: 'Cadastro realizado com sucesso' })

    } catch {
      notificationError();
    }
    finally {
      setLoading(false);
    }
  }, [fn, notificationError, notificationSuccess]);

  useEffect(() => {
    if (options?.enableFetchOnMount) {
      refetch();
    }

  }, [options, refetch])

  return {
    data: response,
    loading,
    refetch
  }
}