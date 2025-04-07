import { useContext } from 'react';
import { getCacheKey } from '../api/cache';
import { StrawContext } from '../context';
import { type JsonCompatible } from '../types';

/**
 * Get cached value against `key`.
 * @param key - Key against which cached data should be returned.
 * @returns Cached data.
 */
export const useCache = () => {
  const { cache } = useContext(StrawContext);

  return <T>(key: JsonCompatible) => {
    // Get actual cache key.
    const cacheKey = getCacheKey(key);

    // If cache has the key, return cached data.
    if (cache.has(cacheKey)) {
      return cache.get<T>(cacheKey);
    }
  };
};
