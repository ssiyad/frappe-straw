import { useResource } from '../resource';

/**
 * Run a method on a document.
 * @param method - Method name.
 * @param doctype - Document type.
 * @param docname - Document name.
 * @returns `Resource` object.
 */
export const useMethod = <T>(
  method: string,
  doctype: string,
  docname: string,
) => {
  const resource = useResource<T>('run_doc_method', {
    params: {
      method,
      dt: doctype,
      dn: docname,
    },
    fetchOnMount: false,
  });

  return {
    ...resource,
    run: resource.refresh,
  };
};
