import { straw } from '../shared';
import { JsonCompatible } from '../types/json';
import { getCacheKey } from './cache';

/**
 * Make an API request.
 * @param url - URL to make request to.
 * @param method - HTTP method to use.
 * @param body - Data to send in request.
 * @param params - Query parameters to send in request.
 * @param cache - Whether to cache the response.
 * @returns Promise
 */
export const api = async ({
  url,
  method,
  params,
  body,
  cache,
}: {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options';
  body?: Record<string, any>;
  params?: Record<string, any>;
  cache?: JsonCompatible;
}) => {
  const cacheKey = getCacheKey(cache, url, method, params, body);

  if (cache) {
    const cached = straw.cache.get(cacheKey);
    if (cached) {
      return Promise.resolve(cached);
    }
  }

  return straw.client
    .request({
      baseURL: url.startsWith('http') ? '' : undefined,
      url,
      method,
      params,
      data: body,
    })
    .then(({ data }) => {
      if (cache) {
        straw.cache.set(cacheKey, data);
      }
      return data;
    });
};
