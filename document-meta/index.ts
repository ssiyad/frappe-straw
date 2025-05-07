import { useResource } from '../resource';
import { BaseDocument, DocumentMeta, FetchOptions } from '../types';

type Doc = BaseDocument & DocumentMeta;
type Meta = Record<string, Doc>;
type Response = {
  docs: Doc[];
};

/**
 * Hook for fetching document meta.
 * @param doctype - Document type.
 * @param options - Fetch options.
 * @returns `Meta` - Meta information for the document and child documents.
 */
export function useDocumentMeta(doctype: string, options?: FetchOptions) {
  return useResource<Response, Meta>('frappe.desk.form.load.getdoctype', {
    params: {
      doctype,
    },
    transform: (data) => {
      return data.docs.reduce((acc, doc) => {
        acc[doc.name] = doc;
        return acc;
      }, {} as Meta);
    },
    ...options,
  });
}
