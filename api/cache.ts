import type { JsonCompatible, Params } from '../types';

export const getCacheKey = (
  cache?: JsonCompatible,
  url?: string,
  method?: string,
  params?: Params,
  body?: Record<string, any>,
) => {
  // If `cache` is `true`, it probably means the user wants to cache the entire
  // api call.
  if (cache && typeof cache === 'boolean') {
    return JSON.stringify({ url, method, body, params });
  }

  // If `cache` is an object, the use is more deliberate about what to cache.
  return JSON.stringify(cache);
};
