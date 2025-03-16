import React from 'react';
import { useResource } from '../resource';
import type { Params, ResponseMessage } from '../types';

type R<T, U> = ResponseMessage<T> & {
  docs: U[];
};

const apiMethod = 'run_doc_method';

/**
 * Run a method on a document.
 * @param method - Method name.
 * @param doctype - Document type.
 * @param docname - Document name.
 */
export const useMethod = <T, U>(
  method: string,
  doctype: string,
  docname: string,
  setParentData: React.Dispatch<React.SetStateAction<{ data: U } | undefined>>,
) => {
  const resource = useResource<R<T, U>>(apiMethod, {
    method: 'post',
    fetchOnMount: false,
  });

  const run = async (params?: Params) => {
    try {
      const r = await resource.refresh({
        params: {
          method,
          dt: doctype,
          dn: docname,
          args: JSON.stringify(params),
        },
      });
      const parentDoc = r?.docs[0];
      if (parentDoc) {
        setParentData({
          data: parentDoc,
        });
      }
      return r?.message;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    ...resource,
    data: resource.data?.message,
    run,
  };
};
