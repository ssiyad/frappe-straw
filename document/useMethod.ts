import React from 'react';
import { useResource } from '../resource';
import type {
  BaseDocument,
  FetchOptions,
  Params,
  ResponseMessage,
} from '../types';

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
export const useMethod = <T, U extends BaseDocument>(
  method: string,
  doctype: string,
  docname: string,
  setParentData: React.Dispatch<React.SetStateAction<U | undefined>>,
  { onSuccess, onError }: FetchOptions<U> = {},
) => {
  const resource = useResource<R<T, U>, U>(apiMethod, {
    method: 'post',
    fetchOnMount: false,
    transform: (data) => data.docs[0],
    onSuccess,
    onError,
  });

  const run = async (params?: Params) => {
    try {
      const parentDoc = await resource.refresh({
        params: {
          method,
          dt: doctype,
          dn: docname,
          args: JSON.stringify(params),
        },
      });

      if (parentDoc) {
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
