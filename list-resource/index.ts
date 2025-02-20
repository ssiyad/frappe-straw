import { Resource, useResource } from '../resource';
import { ListFilter } from '../types';
import { tranformFilter } from './filters';

interface ListResource<T> extends Resource<T[]> {
  count: number;
  nextPage: () => void;
  previousPage: () => void;
  currentPage: number;
}

/**
 * Custom hook to manage a list resource with pagination.
 * @param doctype - Document type.
 * @returns `ListResource<T>`
 */
export function useListResource<T>({
  doctype,
  fields,
  filters,
  group,
  sort,
  start = 0,
  limit = 10,
}: {
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
}): ListResource<T> {
  const url = `/api/resource/${doctype}`;
  const params = {
    fields,
    filters: filters && tranformFilter(filters),
    group_by: group,
    order_by: sort && `${sort.field.toString()} ${sort.direction}`,
    limit,
    limit_start: start,
    as_dict: true,
  };

  const { data, loading, error, fetched, refresh } = useResource<{
    data: T[];
    count: number;
  }>(url, { params });

  // Extracting data
  const result = data?.data ?? [];
  const count = data?.count ?? 0;

  const currentPage = params.limit_start
    ? Math.floor(params.limit_start / (params.limit || 10)) + 1
    : 1;

  const updateStart = (newStart: number) => {
    params.limit_start = newStart;
    refresh();
  };

  const nextPage = () => {
    if (params.limit && params.limit_start !== undefined) {
      updateStart(currentPage * params.limit);
    }
  };

  const previousPage = () => {
    if (params.limit && params.limit_start !== undefined) {
      updateStart((currentPage - 2) * params.limit);
    }
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
