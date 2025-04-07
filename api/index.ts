import { useCallback, useContext } from 'react';
import { useCache, useCacheUpdate } from '../cache';
import { defaultCacheTTL } from '../consts';
import { StrawContext } from '../context';
import type { FetchOptions, JsonCompatible } from '../types';
import { humanTimediff } from '../utils';
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
  const cacheGet = useCache();
  const cacheUpdate = useCacheUpdate();

  return useCallback(
    async ({
      url,
      method = 'get',
      params,
      body,
      cache,
      cacheTime = defaultCacheTTL,
      onError = onErrorGlobal,
      onMessages = onMessagesGlobal,
    }: ApiRequest): Promise<T> => {
      const cacheKey = getCacheKey(cache, url, method, params, body);
      const cacheData = cacheGet<T>(cacheKey);
      if (cacheData) return cacheData;

      try {
        const response = await client.request<T>({
          baseURL: url.startsWith('http') ? '' : undefined,
          url,
          method,
          params,
          data: body,
        });

        if (cacheKey) {
          cacheUpdate(cacheKey, response.data, {
            timeout: humanTimediff(cacheTime),
          });
        }

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
