import { useMemo, useState } from 'react';
import { Resource, useResource } from '../resource';
import { ListFilter } from '../types';
import { tranformFilter } from './filters';

interface UseListResourceOptions<T> {
  doctype: string;
  fields?: (keyof T)[] | '*';
  filters?: ListFilter<T>;
  group?: keyof T;
  sort?: {
    field: keyof T;
    direction: 'asc' | 'desc';
  };
  start?: number;
  limit?: number;
}

interface ListResource<T> extends Resource<T[]> {
  count: number;
  nextPage: () => void;
  previousPage: () => void;
  currentPage: number;
}

interface ApiResponse<T> {
  data: T[];
  count: number;
}

/**
 * Hook to manage a list resource with pagination.
 */
export function useListResource<T>({
  doctype,
  fields,
  filters,
  group,
  sort,
  start = 0,
  limit = 10,
}: UseListResourceOptions<T>): ListResource<T> {
  const [currentStart, setCurrentStart] = useState(start);
  const url = useMemo(() => `/api/resource/${doctype}`, [doctype]);
  const params = useMemo(
    () => ({
      fields: fields === '*' ? [fields] : fields,
      filters: filters && tranformFilter(filters),
      group_by: group,
      order_by: sort && `${sort.field.toString()} ${sort.direction}`,
      limit,
      limit_start: currentStart,
      as_dict: true,
    }),
    [fields, filters, group, sort, limit, currentStart],
  );

  const { data, loading, error, fetched, refresh } = useResource<
    ApiResponse<T>
  >(url, { params });

  const result = data?.data ?? [];
  const count = data?.count ?? 0;
  const currentPage = Math.floor(currentStart / limit) + 1;

  const nextPage = () => {
    setCurrentStart((prev) => Math.min(prev + limit, count - limit));
  };

  const previousPage = () => {
    setCurrentStart((prev) => Math.max(prev - limit, 0));
  };

  return {
    data: result,
    loading,
    error,
    fetched,
    refresh,
    count,
    nextPage,
    previousPage,
    currentPage,
  };
}
