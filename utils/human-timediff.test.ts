import { expect, test } from 'vitest';
import { humanTimediff } from './human-timediff';

test('humanTimediff: 1h', () => {
  expect(humanTimediff('1h')).toBe(3600000);
});

test('humanTimediff: 1m', () => {
  expect(humanTimediff('1m')).toBe(60000);
});

test('humanTimediff: 1s', () => {
  expect(humanTimediff('1s')).toBe(1000);
});

test('humanTimediff: 1ms', () => {
  expect(humanTimediff('1ms')).toBe(1);
});

test('humanTimediff: 1us', () => {
  expect(humanTimediff('1us')).toBe(0.001);
});

test('humanTimediff: 1ns', () => {
  expect(humanTimediff('1ns')).toBe(0.000001);
});

test('humanTimediff: 1h1m1s1ms1us1ns', () => {
  expect(humanTimediff('1h1m1s1ms1us1ns')).toBe(3661001.001001);
});

test('humanTimediff: Invalid input', () => {
  expect(() => humanTimediff('invalid input')).toThrow();
});
