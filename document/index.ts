import { useMemo } from 'react';
import { useResource } from '../resource';
import type { BaseDocument, FetchOptions } from '../types';
import { useAction } from './useAction';
import { useDelete } from './useDelete';
import { useMethod } from './useMethod';
import { useStatus } from './useStatus';
import { useTimeAgo } from './useTimeAgo';

interface UseDocumentOptions<T> extends FetchOptions<T> {
  fetchOnMount?: boolean;
}

interface Document<T extends BaseDocument>
  extends ReturnType<typeof useResource<T>> {
  canSave: boolean;
  canSubmit: boolean;
  canCancel: boolean;
  useStatus: () => ReturnType<typeof useStatus<T>>;
  useTimeAgo: () => ReturnType<typeof useTimeAgo<T>>;
  useSave: (options?: FetchOptions<T>) => ReturnType<typeof useAction<T>>;
  useSubmit: (options?: FetchOptions<T>) => ReturnType<typeof useAction<T>>;
  useCancel: (options?: FetchOptions<T>) => ReturnType<typeof useAction<T>>;
  useMethod: <U>(method: string) => ReturnType<typeof useMethod<U, T>>;
  useDelete: (options?: FetchOptions) => ReturnType<typeof useDelete>;
}

/**
 * Hook for managing a document resource.
 * @param doctype - Document type.
 * @param docname - Document name.
 * @returns `DocumentResource<T>`
 */
export function useDocument<T extends BaseDocument>(
  doctype: string,
  docname: string,
  {
    cache,
    cacheTime,
    fetchOnMount = true,
    onSuccess,
    onError,
    onMessages,
  }: UseDocumentOptions<T> = {},
): Document<T> {
  const url = useMemo(
    () => `/api/resource/${doctype}/${docname}`,
    [doctype, docname],
  );

  const resource = useResource<{ data: T }, T>(url, {
    cache,
    cacheTime,
    fetchOnMount,
    transform: (data) => data.data,
    onSuccess,
    onError,
    onMessages,
  });

  const data = resource.data;
  const setData = resource.setData;
  const docstatus = data?.docstatus;

  const canSave = useMemo(() => docstatus === 0, [docstatus]);
  const canSubmit = useMemo(() => docstatus === 0, [docstatus]);
  const canCancel = useMemo(() => docstatus === 1, [docstatus]);

  return {
    ...resource,
    canSave,
    canSubmit,
    canCancel,
    useStatus: () => useStatus(data),
    useTimeAgo: () => useTimeAgo(data),
    useSave: (options) => useAction('Save', doctype, data, setData, options),
    useSubmit: (options) =>
      useAction('Submit', doctype, data, setData, options),
    useCancel: (options) =>
      useAction('Cancel', doctype, data, setData, options),
    useMethod: <U>(method: string) => {
      return useMethod<U, T>(method, doctype, docname, setData);
    },
    useDelete: (options) => useDelete(doctype, docname, options),
  };
}
