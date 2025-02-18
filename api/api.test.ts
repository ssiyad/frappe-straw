import { beforeEach, expect, test, vi } from 'vitest';
import * as api from '.';
import { init } from '..';
import { getCacheKey } from './cache';

beforeEach(() => {
  init({
    url: 'https://example.com',
  });
});

test('Basic', async () => {
  vi.spyOn(api, 'api').mockResolvedValue({
    data: {
      foo: 'bar',
    },
  });

  const response = await api.api({
    url: '/an/internal/url',
    method: 'get',
  });

  expect(response).toEqual({
    data: {
      foo: 'bar',
    },
  });
});

test('Cache: `true` as key', () => {
  expect(
    getCacheKey(true, '/an/internal/url', 'get', undefined, undefined),
  ).toBe('{"url":"/an/internal/url","method":"get"}');
});

test('Cache: `false` as key', () => {
  expect(
    getCacheKey(false, '/an/internal/url', 'get', undefined, undefined),
  ).toBe('false');
});

test('Cache: Array of strings', () => {
  expect(getCacheKey(['a', 'b', 'c'])).toBe('["a","b","c"]');
});

test('Cache: Array of numbers', () => {
  expect(getCacheKey([1, 2, 3])).toBe('[1,2,3]');
});

test('Cache: Array of objects', () => {
  expect(getCacheKey([{ a: 1 }, { b: 2 }, { c: 3 }])).toBe(
    '[{"a":1},{"b":2},{"c":3}]',
  );
});

test('Cache: Array of mixed', () => {
  expect(getCacheKey([1, 'a', { b: 2 }])).toBe('[1,"a",{"b":2}]');
});

test('Cache: Object', () => {
  expect(getCacheKey({ a: 1, b: 2, c: 3 })).toBe('{"a":1,"b":2,"c":3}');
});

test('Cache: Nested Object', () => {
  expect(getCacheKey({ a: { b: { c: 3 } } })).toBe('{"a":{"b":{"c":3}}}');
});

test('Cache: Nested Array', () => {
  expect(getCacheKey([1, [2, [3]]])).toBe('[1,[2,[3]]]');
});

test('Cache: Nested Mixed', () => {
  expect(getCacheKey([1, { a: [2, 3] }])).toBe('[1,{"a":[2,3]}]');
});
