import { useCallback, useContext } from 'react';
import { StrawContext } from '../context';
import type { FetchOptions, JsonCompatible } from '../types';
import { getCacheKey } from './cache';
import { toStrawError } from './error';

/**
 * API request parameters.
 */
interface ApiRequest extends FetchOptions {
  url: string;
  cache?: JsonCompatible;
}

/**
 * Hook to make an API request with caching.
 */
export const useApi = <T = unknown>() => {
  const { client, cache: cacheStore, onError } = useContext(StrawContext);

  return useCallback(
    async ({
      url,
      method = 'get',
      params,
      body,
      cache,
    }: ApiRequest): Promise<T> => {
      const cacheKey = cache
        ? getCacheKey(cache, url, method, params, body)
        : null;

      if (cacheKey && cacheStore.has(cacheKey)) {
        return cacheStore.get(cacheKey) as T;
      }

      try {
        const response = await client.request<T>({
          baseURL: url.startsWith('http') ? '' : undefined,
          url,
          method,
          params,
          data: body,
        });

        if (cacheKey) cacheStore.set(cacheKey, response.data);

        return response.data;
      } catch (error: any) {
        const err = toStrawError(error);
        onError?.(err);
        throw err;
      }
    },
    [client, cacheStore],
  );
};
