import { useContext } from 'react';
import { StrawContext } from '../context';

/**
 * Clear whole cache storage. This will delete all entries from cache.
 */
export const useCacheClear = () => {
  const { cache } = useContext(StrawContext);

  return () => {
    cache.clear();
  };
};
