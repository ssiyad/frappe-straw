import { useContext } from 'react';
import { getCacheKey } from '../api/cache';
import { StrawContext } from '../context';
import { type JsonCompatible } from '../types';

/**
 * Invalidate cache of a specific key.
 * @param key - Key against which cache should be cleared.
 */
export const useCacheInvalidate = (key: JsonCompatible) => {
  const cacheKey = getCacheKey(key);
  const { cache } = useContext(StrawContext);
  return cache.delete(cacheKey);
};
