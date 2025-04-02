import { useCallback, useContext } from 'react';
import { StrawContext } from '../context';
import type { FetchOptions, JsonCompatible } from '../types';
import { getCacheKey } from './cache';
import { toStrawError } from './error';
import { toServerMessages } from './message';
import { strip } from './strip';

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
  const {
    client,
    cache: cacheStore,
    onError: onErrorGlobal,
    onMessages: onMessagesGlobal,
  } = useContext(StrawContext);

  return useCallback(
    async ({
      url,
      method = 'get',
      params,
      body,
      cache,
      onError = onErrorGlobal,
      onMessages = onMessagesGlobal,
    }: ApiRequest): Promise<T> => {
      const cacheKey = getCacheKey(cache, url, method, params, body);

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

        const messages = toServerMessages(response);
        if (messages.length > 0) onMessages?.(messages);
        const stripped = strip(response.data);
        return stripped;
      } catch (error: any) {
        const err = toStrawError(error);
        onError?.(err);
        throw err;
      }
    },
    [client, cacheStore],
  );
};
