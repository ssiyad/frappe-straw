import { useMemo } from 'react';
import { useListResource, type UseListResourceOptions } from '../list-resource';
import { type FetchOptions } from '../types';
import { useCount } from './useCount';

interface UseDocumentListResourceOptions<T>
  extends Omit<UseListResourceOptions<T>, 'url'> {
  doctype: string;
}

interface ListResource<T> extends ReturnType<typeof useListResource<T>> {
  useCount: (options?: FetchOptions<number>) => ReturnType<typeof useCount>;
}

/**
 * Hook to manage a document (of doctype) list resource with pagination.
 */
export function useDocumentListResource<T>({
  doctype,
  ...listOptions
}: UseDocumentListResourceOptions<T>): ListResource<T> {
  // Construct the URL for the resource.
  const url = useMemo(() => `/api/resource/${doctype}`, [doctype]);

  // Use the list resource hook.
  const listResource = useListResource({
    url,
    ...listOptions,
  });

  return {
    ...listResource,
    useCount: (options) => useCount(doctype, listOptions.filters, options),
  };
}
