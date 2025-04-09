import { tranformFilter } from '../list/filters';
import { useResource } from '../resource';
import type { FetchOptions, ListFilter, ResponseMessage } from '../types';

const apiMethod = 'frappe.desk.reportview.get_count';

export const useCount = <T>(
  doctype: string,
  filters?: ListFilter<T>,
  { cache, cacheTime, onSuccess, onError }: FetchOptions<number> = {},
) => {
  return useResource<ResponseMessage<number>, number>(apiMethod, {
    params: {
      doctype,
      filters: filters && JSON.stringify(tranformFilter(filters)),
    },
    cache,
    cacheTime,
    transform: (data) => data.message,
    onSuccess,
    onError,
  });
};
