import { useCallback, useMemo } from 'react';
import { useApi } from '../api';
import { useResource } from '../resource';
import type { BaseDocument, StrawError } from '../types';
import { useMethod } from './useMethod';

interface UseDocumentResourceOptions {
  fetchOnMount?: boolean;
}

interface DocumentResource<T extends BaseDocument> {
  data: T | undefined;
  loading: boolean;
  error: StrawError | null;
  fetched: boolean;
  refresh: () => void;
  save: () => Promise<void>;
  submit: () => Promise<void>;
  cancel: () => Promise<void>;
  useMethod: <U>(method: string) => ReturnType<typeof useMethod<U, T>>;
}

const DOCUMENT_ACTION_URL = 'frappe.desk.form.save.savedocs';

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
  const apiRequest = useApi();

  // Extract actual document from API response
  const result = resource.data?.data;

  const performAction = useCallback(
    async (action: 'Save' | 'Submit' | 'Cancel') => {
      if (!result) throw new Error('No document data available');

      await apiRequest({
        url: DOCUMENT_ACTION_URL,
        method: 'post',
        body: {
          doc: JSON.stringify(result),
          action,
        },
      });

      resource.refresh();
    },
    [apiRequest, result, resource.refresh],
  );

  return {
    ...resource,
    data: result,
    save: () => performAction('Save'),
    submit: () => performAction('Submit'),
    cancel: () => performAction('Cancel'),
    useMethod: <U>(method: string) => {
      return useMethod<U, T>(method, doctype, docname, resource.setData);
    },
  };
}
