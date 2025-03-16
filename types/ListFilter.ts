export type ListFilterOperator =
  | '='
  | '>'
  | '<'
  | '>='
  | '<='
  | '<>'
  | 'like'
  | '!='
  | 'Timespan';

export type ListFilterValueExtended<T, K extends keyof T> = {
  operator: ListFilterOperator;
  value: T[K];
};

export type ListFilter<T = unknown> = {
  [key in keyof T]?: T[key] | ListFilterValueExtended<T, key>;
};
