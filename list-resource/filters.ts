import {
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
        acc.push([x.key, x.operator, x.value]);
        return acc;
      },
      [] as unknown as [keyof T, ListFilterOperator, ListFilter<T>[keyof T]][],
    );
};
