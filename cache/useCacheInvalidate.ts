import { useContext } from 'react';
import { getCacheKey } from '../api/cache';
import { StrawContext } from '../context';
import { type JsonCompatible } from '../types';

/**
 * Invalidate cache of a specific key.
 * @param key - Key against which cache should be cleared.
 */
export const useCacheInvalidate = () => {
  const { cache } = useContext(StrawContext);

  return (key: JsonCompatible) => {
    const cacheKey = getCacheKey(key);
    return cache.delete(cacheKey);
  };
};
