import { useCallback, useMemo } from 'react';
import { useApi } from '../api';
import { useResource } from '../resource';
import { BaseDocument } from '../types';

interface UseDocumentResourceOptions {
  fetchOnMount?: boolean;
}

interface DocumentResource<T extends BaseDocument> {
  data: T | undefined;
  loading: boolean;
  error: Error | null;
  fetched: boolean;
  refresh: () => void;
  save: () => Promise<void>;
  submit: () => Promise<void>;
  cancel: () => Promise<void>;
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

  const { data, loading, error, fetched, refresh } = useResource<{ data: T }>(
    url,
    {
      fetchOnMount,
    },
  );
  const apiRequest = useApi();

  // Extract actual document from API response
  const result = data?.data;

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

      refresh();
    },
    [apiRequest, result, refresh],
  );

  return {
    data: result,
    loading,
    error,
    fetched,
    refresh,
    save: () => performAction('Save'),
    submit: () => performAction('Submit'),
    cancel: () => performAction('Cancel'),
  };
}
