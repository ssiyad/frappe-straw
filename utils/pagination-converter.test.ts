import { expect, test } from 'vitest';
import { paginationConverter } from './pagination-converter';

test('Pagination Converter page 0', () => {
  const pagination = {
    pageIndex: 0,
    pageSize: 10,
  };
  const [start, limit] = paginationConverter(pagination);
  expect(start).toBe(0);
  expect(limit).toBe(10);
});

test('Pagination Converter page 2', () => {
  const pagination = {
    pageIndex: 2,
    pageSize: 10,
  };
  const [start, limit] = paginationConverter(pagination);
  expect(start).toBe(20);
  expect(limit).toBe(10);
});
