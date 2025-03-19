import { useMemo } from 'react';
import { useResource } from '../resource';
import type { BaseDocument, FetchOptions } from '../types';
import { useAction } from './useAction';
import { useMethod } from './useMethod';
import { useStatus } from './useStatus';
import { useTimeAgo } from './useTimeAgo';

interface UseDocumentResourceOptions<T> extends FetchOptions<T> {
  fetchOnMount?: boolean;
}

interface DocumentResource<T extends BaseDocument>
  extends ReturnType<typeof useResource<T>> {
  canSave: boolean;
  canSubmit: boolean;
  canCancel: boolean;
  useStatus: () => ReturnType<typeof useStatus<T>>;
  useTimeAgo: () => ReturnType<typeof useTimeAgo<T>>;
  useSave: () => ReturnType<typeof useAction<T>>;
  useSubmit: () => ReturnType<typeof useAction<T>>;
  useCancel: () => ReturnType<typeof useAction<T>>;
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
  {
    fetchOnMount = true,
    onSuccess,
    onError,
  }: UseDocumentResourceOptions<T> = {},
): DocumentResource<T> {
  const url = useMemo(
    () => `/api/resource/${doctype}/${docname}`,
    [doctype, docname],
  );

  const resource = useResource<{ data: T }, T>(url, {
    fetchOnMount,
    transform: (data) => data.data,
    onSuccess,
    onError,
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
    useSave: () => useAction('Save', data, setData),
    useSubmit: () => useAction('Submit', data, setData),
    useCancel: () => useAction('Cancel', data, setData),
    useMethod: <U>(method: string) => {
      return useMethod<U, T>(method, doctype, docname, setData);
    },
  };
}
