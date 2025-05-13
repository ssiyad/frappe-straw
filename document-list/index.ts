import { useMemo } from 'react';
import { useList, type UseListOptions } from '../list';
import { type FetchOptions } from '../types';
import { useCount } from './useCount';

interface UseDocumentListOptions<T> extends Omit<UseListOptions<T>, 'url'> {
  doctype: string;
}

interface DocumentList<T> extends ReturnType<typeof useList<T>> {
  useCount: (options?: FetchOptions<number>) => ReturnType<typeof useCount>;
}

/**
 * Hook to manage a document (of doctype) list resource with pagination.
 */
export function useDocumentList<T>({
  doctype,
  ...listOptions
}: UseDocumentListOptions<T>): DocumentList<T> {
  // Construct the URL for the resource.
  const url = useMemo(() => `/api/resource/${doctype}`, [doctype]);

  // Use the list resource hook.
  const listResource = useList({
    url,
    ...listOptions,
  });

  return {
    ...listResource,
    useCount: (options) =>
      useCount(doctype, listOptions.filters, listOptions.orFilters, options),
  };
}
