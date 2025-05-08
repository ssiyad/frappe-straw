import type {
  ListFilter,
  ListFilterOperator,
  ListFilterValueExtended,
} from '../types';

/**
 * @template T - Generic type
 * @param input - Filter object
 * @returns Transformed filter object compatible with Frappe
 */
export const tranformFilter = <T>(input: ListFilter<T>) => {
  type V = ListFilter<T>[keyof T];
  type I = [keyof T, ListFilterOperator, V];

  return Object.keys(input)
    .map((k) => {
      const key = k as keyof T;
      const val = input[key];
      const operator =
        val && typeof val === 'object'
          ? (val as ListFilterValueExtended<T, typeof key>).operator
          : '=';
      const value =
        val && typeof val === 'object'
          ? (val as ListFilterValueExtended<T, typeof key>).value
          : val;

      return {
        key,
        operator,
        value,
      };
    })
    .filter((x) => !!x.value)
    .reduce(
      (acc, x) => {
        // @ts-ignore
        acc.push([x.key, x.operator, x.value].map(encodeURIComponent));
        return acc;
      },
      [] as unknown as I[],
    );
};
