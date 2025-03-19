import { useResource } from '../resource';
import type { FetchOptions, ListFilter, ResponseMessage } from '../types';

const apiMethod = 'frappe.desk.reportview.get_count';

export const useCount = <T>(
  doctype: string,
  filters?: ListFilter<T>,
  { onSuccess, onError }: FetchOptions<ResponseMessage<number>> = {},
) => {
  const resource = useResource<ResponseMessage<number>>(apiMethod, {
    params: {
      doctype,
      filters,
    },
    onSuccess,
    onError,
  });

  return {
    ...resource,
    data: resource.data?.message,
  };
};
