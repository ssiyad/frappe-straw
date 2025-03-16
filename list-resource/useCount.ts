import { useResource } from '../resource';
import { ListFilter } from '../types';

export const useCount = <T>(doctype: string, filters?: ListFilter<T>) => {
  const resource = useResource<{
    message: number;
  }>('frappe.desk.reportview.get_count', {
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
