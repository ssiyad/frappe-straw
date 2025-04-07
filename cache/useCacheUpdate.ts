import { useContext } from 'react';
import { StrawContext } from '../context';
import { type JsonCompatible } from '../types';
import { getCacheKey } from './getCacheKey';

/**
 * Update cache of `key`.
 * @param key - Key against which cache should be updated.
 * @param value - Value to update.
 */
export const useCacheUpdate = () => {
  const { cache } = useContext(StrawContext);

  return <T = unknown>(
    key: JsonCompatible,
    value: T,
    { timeout }: { timeout?: number } = {},
  ) => {
    const cacheKey = getCacheKey(key);
    cache.set(cacheKey, value, {
      ttl: timeout,
    });
    return value;
  };
};
