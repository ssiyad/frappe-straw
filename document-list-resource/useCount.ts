import { useResource } from '../resource';
import type { FetchOptions, ListFilter, ResponseMessage } from '../types';

const apiMethod = 'frappe.desk.reportview.get_count';

export const useCount = <T>(
  doctype: string,
  filters?: ListFilter<T>,
  { onSuccess, onError }: FetchOptions<number> = {},
) => {
  return useResource<ResponseMessage<number>, number>(apiMethod, {
    params: {
      doctype,
      filters,
    },
    transform: (data) => data.message,
    onSuccess,
    onError,
  });
};
