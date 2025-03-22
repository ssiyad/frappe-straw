import { useCallback, useEffect, useState } from 'react';
import { useApi } from '../api';
import type { FetchOptions, JsonCompatible, StrawError } from '../types';

interface UseResourceOptions<T, U> extends FetchOptions<U> {
  placeholder?: U;
  cache?: JsonCompatible;
  fetchOnMount?: boolean;
  transform?: (data: T) => U;
}

export interface Resource<T> {
  data: T | undefined;
  loading: boolean;
  error: StrawError | null;
  fetched: boolean;
  refresh: (options?: FetchOptions<T>) => Promise<T | undefined>;
  setData: React.Dispatch<React.SetStateAction<T | undefined>>;
}

export function useResource<T, U = T>(
  url: string,
  {
    method = 'get',
    body,
    params,
    placeholder,
    cache,
    fetchOnMount = true,
    transform = (data) => data as unknown as U,
    onSuccess,
    onError,
    onMessages,
  }: UseResourceOptions<T, U> = {},
): Resource<U> {
  const apiRequest = useApi<T>();
  const [data, setData] = useState<U | undefined>(placeholder);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<StrawError | null>(null);
  const [fetched, setFetched] = useState(false);

  // Ensure URL is valid.
  const validUrl =
    url.startsWith('http') || url.startsWith('/') ? url : `/api/method/${url}`;

  const fetchData = useCallback(
    async (options: FetchOptions<U> = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiRequest({
          url: validUrl,
          method,
          params: options.params || params,
          body: options.body || body,
          cache,
          onError,
          onMessages,
        });
        const transformed = transform(response);
        setData(transformed);
        setFetched(true);
        onSuccess?.(transformed);
        return transformed;
      } catch (err: any) {
        setData(undefined);
        setError(err);
        onError?.(err);
      } finally {
        setLoading(false);
      }
    },
    [apiRequest, url, method, body, params, cache],
  );

  // Fetch data on mount.
  useEffect(() => {
    if (fetchOnMount) fetchData();
  }, [
    JSON.stringify({
      url,
      params,
      body,
    }),
  ]);

  return {
    data,
    loading,
    error,
    fetched,
    refresh: fetchData,
    setData,
  };
}
