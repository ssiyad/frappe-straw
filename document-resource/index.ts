import { useMemo } from 'react';
import { useResource } from '../resource';
import type { BaseDocument, StrawError } from '../types';
import { useAction } from './useAction';
import { useMethod } from './useMethod';
import { useTimeAgo } from './useTimeAgo';

interface UseDocumentResourceOptions {
  fetchOnMount?: boolean;
}

interface DocumentResource<T extends BaseDocument> {
  data: T | undefined;
  loading: boolean;
  error: StrawError | null;
  fetched: boolean;
  refresh: () => void;
  useTimeAgo: () => ReturnType<typeof useTimeAgo<T>>;
  useSave: () => ReturnType<typeof useAction<T>>;
  useMethod: <U>(method: string) => ReturnType<typeof useMethod<U, T>>;
}

/**
 * Hook for managing a document resource.
 * @param doctype - Document type.
 * @param docname - Document name.
 * @returns `DocumentResource<T>`
 */
export function useDocumentResource<T extends BaseDocument>(
  doctype: string,
  docname: string,
  { fetchOnMount = true }: UseDocumentResourceOptions = {},
): DocumentResource<T> {
  const url = useMemo(
    () => `/api/resource/${doctype}/${docname}`,
    [doctype, docname],
  );

  const resource = useResource<{ data: T }>(url, {
    fetchOnMount,
  });

  // Extract actual document from API response
  const result = resource.data?.data;

  return {
    ...resource,
    data: result,
    useTimeAgo: () => useTimeAgo(result),
    useSave: () => useAction('Save', result, resource.setData),
    useMethod: <U>(method: string) => {
      return useMethod<U, T>(method, doctype, docname, resource.setData);
    },
  };
}
