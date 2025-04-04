import { useMemo, useState } from 'react';
import { useResource } from '../resource';
import type { FetchOptions, ListFilter } from '../types';
import { tranformFilter } from './filters';

interface R<T> {
  data: T[];
}

export interface UseListResourceOptions<T> extends FetchOptions<T> {
  url: string;
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

interface ListResource<T> extends ReturnType<typeof useResource<R<T>, T[]>> {
  currentPage: number;
  nextPage: () => void;
  previousPage: () => void;
}

/**
 * Hook to manage a list resource with pagination.
 */
export function useListResource<T>({
  url,
  fields,
  filters,
  group,
  sort,
  start = 0,
  limit = 10,
  cache,
  cacheTime,
}: UseListResourceOptions<T>): ListResource<T> {
  const [currentStart, setCurrentStart] = useState(start);
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
    [
      JSON.stringify({
        fields,
        filters,
        group,
        sort,
        limit,
        currentStart,
      }),
    ],
  );

  const resource = useResource<R<T>, T[]>(url, {
    params,
    cache,
    cacheTime,
    transform: (data) => data.data,
  });

  const currentPage = Math.floor(currentStart / limit) + 1;

  const nextPage = () => {
    setCurrentStart((prev) => prev + limit);
  };

  const previousPage = () => {
    setCurrentStart((prev) => Math.max(prev - limit, 0));
  };

  return {
    ...resource,
    nextPage,
    previousPage,
    currentPage,
  };
}
