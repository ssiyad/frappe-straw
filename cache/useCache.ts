import { useContext } from 'react';
import { getCacheKey } from '../api/cache';
import { StrawContext } from '../context';
import { type JsonCompatible } from '../types';

/**
 * Get cached value against `key`.
 * @param key - Key against which cached data should be returned.
 * @returns Cached data.
 */
export const useCache = <T>(key: JsonCompatible): T | undefined => {
  const { cache } = useContext(StrawContext);
  const cacheKey = getCacheKey(key);
  return cache.get(cacheKey);
};
