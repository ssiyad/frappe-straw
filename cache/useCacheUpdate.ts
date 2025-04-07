import { useContext } from 'react';
import { StrawContext } from '../context';
import { type JsonCompatible } from '../types';
import { humanTimediff } from '../utils';
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
    { timeout = 0 }: { timeout?: string | number } = {},
  ) => {
    const cacheKey = getCacheKey(key);
    const ttl = humanTimediff(timeout);
    cache.set(cacheKey, value, {
      ttl,
    });
    return value;
  };
};
