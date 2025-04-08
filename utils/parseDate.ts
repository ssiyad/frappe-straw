import { parse } from 'date-fns';

/**
 * Parses a date string in the format 'yyyy-MM-dd' and returns a Date object.
 * Can be used for Frappe's Date type.
 * @param date - The date string to parse.
 * @returns The parsed Date object.
 * @example
 * const dateFromFrappe = '2023-10-01';
 * parseDate(dateFromFrappe) // returns Date object for October 1, 2023
 */
export const parseDate = (date: string) => {
  return parse(date, 'yyyy-MM-dd', new Date());
};
