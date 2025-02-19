import { beforeEach, expect, test, vi } from 'vitest';
import * as api from '.';
import { init } from '..';

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
