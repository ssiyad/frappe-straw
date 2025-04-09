import { expect, test } from 'vitest';
import { tranformFilter } from './filters';

test('Key Value Pair', () => {
  expect(
    tranformFilter({
      foo: 'bar',
      bar: 42,
      baz: true,
    }),
  ).toEqual([
    ['foo', '=', 'bar'],
    ['bar', '=', 42],
    ['baz', '=', true],
  ]);
});

test('Key Value Pair with Operator', () => {
  expect(
    tranformFilter({
      foo: { operator: '>', value: 42 },
      bar: { operator: '<', value: 42 },
      baz: { operator: '!=', value: 42 },
    }),
  ).toEqual([
    ['foo', '>', 42],
    ['bar', '<', 42],
    ['baz', '!=', 42],
  ]);
});

test('Key Value Pair with Operator and Value', () => {
  expect(
    tranformFilter({
      foo: { operator: 'like', value: 'bar' },
      bar: { operator: 'Timespan', value: 42 },
    }),
  ).toEqual([
    ['foo', 'like', 'bar'],
    ['bar', 'Timespan', 42],
  ]);
});

test('Empty Object', () => {
  expect(tranformFilter({})).toEqual([]);
});

test('Empty Value', () => {
  expect(tranformFilter({ foo: undefined })).toEqual([]);
});

test('Empty Value and Operator', () => {
  expect(tranformFilter({ foo: {} })).toEqual([]);
});

test('Empty Value and Operator with Key', () => {
  expect(tranformFilter({ foo: { operator: '>', value: undefined } })).toEqual(
    [],
  );
});

test('Mixed key values', () => {
  expect(
    tranformFilter({
      foo: 'bar',
      bar: { operator: '>', value: 42 },
      baz: { operator: 'like', value: 'bar' },
    }),
  ).toEqual([
    ['foo', '=', 'bar'],
    ['bar', '>', 42],
    ['baz', 'like', 'bar'],
  ]);
});
