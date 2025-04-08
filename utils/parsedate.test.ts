import { expect, test } from 'vitest';
import { parseDate } from './parseDate';

test('parseDate', () => {
  const parsedDate = parseDate('2023-10-01');
  expect(parsedDate).toBeInstanceOf(Date);
  expect(parsedDate.toString()).toBe('2023-10-01T00:00:00.000Z');
  expect(parsedDate.valueOf()).toEqual(new Date('2023-10-01').valueOf());
});

test('parseDate with invalid date', () => {
  expect(parseDate('invalid-date').toString()).toBe('Invalid Date');
});

test('parseDate with empty string', () => {
  expect(parseDate('').toString()).toBe('Invalid Date');
});
