import { Body } from './Body';
import { HttpMethod } from './HttpMethod';
import { Params } from './Params';

export type FetchOptions = {
  method?: HttpMethod;
  body?: Body;
  params?: Params;
};
