import { beforeEach, expect, test } from 'vitest';
import { createResource } from '.';
import { init } from '..';

beforeEach(() => {
  init({
    url: 'https://example.com',
  });
});

test('External URL', () => {
  const resource = createResource({
    url: 'https://jsonplaceholder.typicode.com/posts/1',
  });

  expect(resource.url).toBe('https://jsonplaceholder.typicode.com/posts/1');
  expect(resource.method).toBe('get');
});

test('External URL with POST', () => {
  const resource = createResource({
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    method: 'post',
  });

  expect(resource.url).toBe('https://jsonplaceholder.typicode.com/posts/1');
  expect(resource.method).toBe('post');
});

test('Internal URL', () => {
  const resource = createResource({
    url: '/an/internal/url',
  });

  expect(resource.url).toBe('/an/internal/url');
  expect(resource.method).toBe('get');
});

test('Internal Method', () => {
  const resource = createResource({
    url: 'an.internal.url',
  });

  expect(resource.url).toBe('/api/method/an.internal.url');
  expect(resource.method).toBe('get');
});

test('Internal Method with POST', () => {
  const resource = createResource({
    url: 'an.internal.url',
    method: 'post',
  });

  expect(resource.url).toBe('/api/method/an.internal.url');
  expect(resource.method).toBe('post');
});

test('Internal Method with Body', () => {
  const resource = createResource({
    url: 'an.internal.url',
    method: 'post',
    body: { key: 'value' },
  });

  expect(resource.url).toBe('/api/method/an.internal.url');
  expect(resource.method).toBe('post');
  expect(resource.body).toEqual({ key: 'value' });
});

test('Internal Method with Params', () => {
  const resource = createResource({
    url: 'an.internal.url',
    method: 'post',
    params: { key: 'value' },
  });

  expect(resource.url).toBe('/api/method/an.internal.url');
  expect(resource.method).toBe('post');
  expect(resource.params).toEqual({ key: 'value' });
});
