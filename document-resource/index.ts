import { api } from '../api';
import { useResource } from '../resource';
import { BaseDocument } from '../types';

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

/**
 * Custom hook for managing a document resource.
 * @param doctype - Document type.
 * @param docname - Document name.
 * @returns `DocumentResource`
 */
export function useDocumentResource<T extends BaseDocument>(
  doctype: string,
  docname: string,
): DocumentResource<T> {
  const url = `/api/resource/${doctype}/${docname}`;
  const { data, loading, error, fetched, refresh } = useResource<{ data: T }>(
    url,
  );

  // Actual document result extracted from API response
  const result = data?.data;

  const performAction = async (action: 'Save' | 'Submit' | 'Cancel') => {
    if (!result) return Promise.reject(new Error('No document data available'));

    return api({
      url: 'frappe.desk.form.save.savedocs',
      method: 'post',
      body: {
        doc: JSON.stringify(result),
        action,
      },
    }).then(refresh);
  };

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
