import React from 'react';
import { useResource } from '../resource';
import { type BaseDocument } from '../types';

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
  doc?: T,
  setParentData?: React.Dispatch<React.SetStateAction<{ data: T } | undefined>>,
) => {
  const resource = useResource<R<T>>(actionMethod, {
    method: 'post',
    fetchOnMount: false,
  });

  const run = async (values?: Partial<T>) => {
    try {
      if (!doc) return;

      const r = await resource.refresh({
        body: {
          doc: JSON.stringify({
            ...doc,
            ...values,
          }),
          action,
        },
      });

      const parentDoc = r?.docs[0];
      if (parentDoc && setParentData) {
        setParentData({
          data: parentDoc,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    ...resource,
    run,
  };
};
