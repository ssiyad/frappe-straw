import { useCallback, useEffect, useState } from 'react';
import { api } from '../api';
import { HttpMethod, JsonCompatible } from '../types';

interface UseResourceOptions<T> {
  method?: HttpMethod;
  body?: Record<string, any>;
  params?: Record<string, any>;
  placeholder?: T;
  cache?: JsonCompatible;
}

export interface Resource<T> {
  data: T | undefined;
  loading: boolean;
  error: Error | null;
  fetched: boolean;
  refresh: () => void;
}

export function useResource<T>(
  url: string,
  options?: UseResourceOptions<T>,
): Resource<T> {
  const [data, setData] = useState<T | undefined>(options?.placeholder);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetched, setFetched] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(() => {
    setLoading(true);
    setError(null);

    api<T>({
      url,
      method: options?.method ?? 'get',
      params: options?.params,
      body: options?.body,
      cache: options?.cache,
    })
      .then((response) => {
        setData(response);
        setFetched(true);
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, options]);

  // Initial fetch
  useEffect(refresh, [refresh]);

  return { data, loading, error, fetched, refresh };
}
