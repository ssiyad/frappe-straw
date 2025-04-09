import React from 'react';
import { useResource } from '../resource';
import type { BaseDocument, DeepPartial, FetchOptions } from '../types';

type R<T> = {
  docs: T[];
};

const actionMethod = 'frappe.desk.form.save.savedocs';

/**
 * Run an action on a document.
 * @param action - Action name.
 * @param doc - Document data.
 * @param setParentData - Set parent data.
 * @returns `useResource` object.
 */
export const useAction = <T extends BaseDocument>(
  action: 'Save' | 'Submit' | 'Cancel',
  doctype: string,
  doc?: T,
  setParentData?: React.Dispatch<React.SetStateAction<T | undefined>>,
  { onSuccess, onError }: FetchOptions<T> = {},
) => {
  const resource = useResource<R<T>, T>(actionMethod, {
    method: 'post',
    fetchOnMount: false,
    transform: (data) => data.docs[0],
    onSuccess,
    onError,
  });

  const run = async (values?: DeepPartial<T>) => {
    try {
      const parentDoc = await resource.refresh({
        body: {
          doc: JSON.stringify({
            doctype,
            ...doc,
            ...values,
          }),
          action,
        },
      });

      if (parentDoc && setParentData) {
        setParentData(parentDoc);
      }

      return parentDoc;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    ...resource,
    run,
  };
};
