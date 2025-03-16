import { useResource } from '../resource';
import { ListFilter, ResponseMessage } from '../types';

const apiMethod = 'frappe.desk.reportview.get_count';

export const useCount = <T>(doctype: string, filters?: ListFilter<T>) => {
  const resource = useResource<ResponseMessage<number>>(apiMethod, {
    params: {
      doctype,
      filters,
    },
  });

  return {
    ...resource,
    data: resource.data?.message,
  };
};
