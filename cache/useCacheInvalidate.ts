import { useContext } from 'react';
import { StrawContext } from '../context';
import { type JsonCompatible } from '../types';
import { getCacheKey } from './getCacheKey';

type CacheInvalidateOptions = {
  onSuccess?: () => void;
  onError?: () => void;
};

/**
 * Invalidate cache of a specific key.
 * @param key - Key against which cache should be cleared.
 */
export const useCacheInvalidate = () => {
  const { cache } = useContext(StrawContext);

  return (
    key: JsonCompatible,
    { onSuccess = () => {}, onError = () => {} }: CacheInvalidateOptions = {},
  ) => {
    // Get actual cache key.
    const cacheKey = getCacheKey(key);

    // Delete cache entry.
    const status = cache.delete(cacheKey);

    // Run success or error callbacks.
    if (status) onSuccess();
    else onError();

    // Return status of cache deletion.
    return status;
  };
};
