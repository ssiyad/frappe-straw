import { straw } from '../shared';

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
  cache?: boolean;
}) => {
  if (cache) {
    const key = JSON.stringify({ url, method, body, params });
    const cached = straw.cache.get(key);
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
        const key = JSON.stringify({ url, method, body, params });
        straw.cache.set(key, data);
      }
      return data;
    });
};
