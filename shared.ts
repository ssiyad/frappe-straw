import TTLCache from '@isaacs/ttlcache';
import { AxiosInstance } from 'axios';

type Straw = {
  client: AxiosInstance;
  cache: TTLCache<unknown, unknown>;
};

export const straw: Straw = {
  client: {} as AxiosInstance,
  cache: new TTLCache({
    max: 1000,
    ttl: 1000 * 60 * 5,
  }),
};
