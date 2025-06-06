import { useMemo } from 'react';
import { useResource } from '../resource';
import type { FetchOptions, ListFilter } from '../types';
import { tranformFilter } from './filters';

interface R<T> {
  data: T[];
}

export interface UseListOptions<T> extends FetchOptions<T[]> {
  url: string;
  fields?: (keyof T)[] | '*';
  filters?: ListFilter<T>;
  orFilters?: ListFilter<T>;
  group?: keyof T;
  sort?: {
    field: keyof T;
    direction: 'asc' | 'desc';
  };
  start?: number;
  limit?: number;
}

interface List<T> extends ReturnType<typeof useResource<R<T>, T[]>> {
  currentPage: number;
}

/**
 * Hook to manage a list resource with pagination.
 */
export function useList<T>({
  url,
  fields,
  filters,
  orFilters,
  group,
  sort,
  start = 0,
  limit = 10,
  onSuccess,
  onError,
  onMessages,
  cache,
  cacheTime,
}: UseListOptions<T>): List<T> {
  const params = useMemo(
    () => ({
      fields: fields === '*' ? [fields] : fields,
      filters: filters && JSON.stringify(tranformFilter(filters)),
      or_filters: orFilters && JSON.stringify(tranformFilter(orFilters)),
      group_by: group,
      order_by: sort && `${sort.field.toString()} ${sort.direction}`,
      limit,
      limit_start: start,
      as_dict: true,
    }),
    [
      JSON.stringify({
        fields,
        filters,
        orFilters,
        group,
        sort,
        start,
        limit,
      }),
    ],
  );

  const resource = useResource<R<T>, T[]>(url, {
    params,
    cache,
    cacheTime,
    transform: (data) => data.data,
    onSuccess,
    onError,
    onMessages,
  });

  const currentPage = Math.floor(start / limit) + 1;

  return {
    ...resource,
    currentPage,
  };
}
