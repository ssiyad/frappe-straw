import { useContext } from 'react';
import { getCacheKey } from '../api/cache';
import { StrawContext } from '../context';
import { type JsonCompatible } from '../types';

/**
 * Update cache of `key`.
 * @param key - Key against which cache should be updated.
 * @param value - Value to update.
 */
export const useCacheUpdate = <T = unknown>(key: JsonCompatible, value: T) => {
  const { cache } = useContext(StrawContext);
  const cacheKey = getCacheKey(key);
  cache.set(cacheKey, value);
  return value;
};
