import { useResource } from '../resource';
import type { FetchOptions } from '../types';

/**
 * Hook for deleting a document resource.
 * @param doctype - Document type.
 * @param docname - Document name.
 * @param options - Options for the hook.
 * @returns `DeleteResource`
 */
export const useDelete = (
  doctype: string,
  docname: string,
  { onSuccess, onError }: FetchOptions = {},
) => {
  const resource = useResource('frappe.client.delete', {
    method: 'post',
    fetchOnMount: false,
    onSuccess,
    onError,
  });

  const deleteDoc = async () => {
    try {
      await resource.refresh({
        body: {
          doctype,
          name: docname,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    ...resource,
    deleteDoc,
  };
};
