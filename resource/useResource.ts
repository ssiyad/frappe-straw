import { useCallback, useEffect, useState } from 'react';
import { useApi } from '../api';
import type { HttpMethod, JsonCompatible, Params } from '../types';

interface UseResourceOptions<T> {
  method?: HttpMethod;
  body?: Record<string, any>;
  params?: Params;
  placeholder?: T;
  cache?: JsonCompatible;
  fetchOnMount?: boolean;
}

export interface Resource<T> {
  data: T | undefined;
  loading: boolean;
  error: Error | null;
  fetched: boolean;
  refresh: ({ params }?: { params?: Params }) => Promise<T | undefined>;
  setData: React.Dispatch<React.SetStateAction<T | undefined>>;
}

export function useResource<T>(
  url: string,
  {
    method = 'get',
    body,
    params,
    placeholder,
    cache,
    fetchOnMount = true,
  }: UseResourceOptions<T> = {},
): Resource<T> {
  const apiRequest = useApi<T>();
  const [data, setData] = useState<T | undefined>(placeholder);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [fetched, setFetched] = useState(false);

  // Ensure URL is valid.
  const validUrl =
    url.startsWith('http') || url.startsWith('/') ? url : `/api/method/${url}`;

  const fetchData = useCallback(
    async ({ params: paramsRequest }: { params?: Params } = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiRequest({
          url: validUrl,
          method,
          params: paramsRequest || params,
          body,
          cache,
        });
        setData(response);
        setFetched(true);
        return response;
      } catch (err) {
        setData(undefined);
        setError(err instanceof Error ? err : new Error('Unknown error'));
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
