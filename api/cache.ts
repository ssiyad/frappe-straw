import type { JsonCompatible, Params } from '../types';

export const getCacheKey = (
  cache?: JsonCompatible,
  url?: string,
  method?: string,
  params?: Params,
  body?: Record<string, any>,
) => {
  // If `cache` is not defined, we don't have to cache anything.
  if (!cache) {
    return false;
  }

  // If `cache` is `true`, it probably means the user wants to cache the entire
  // api call.
  if (cache && typeof cache === 'boolean') {
    return JSON.stringify({ url, method, body, params });
  }

  // If `cache` is a string, it is probably a cache key.
  if (typeof cache === 'string') {
    return cache;
  }

  // If `cache` is an object, the user is more deliberate about what to cache.
  return JSON.stringify(cache);
};
