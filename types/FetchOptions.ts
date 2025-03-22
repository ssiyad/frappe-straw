import type { Body } from './Body';
import type { HttpMethod } from './HttpMethod';
import type { Params } from './Params';
import type { ServerMessage } from './ServerMessage';
import type { StrawError } from './StrawError';

export type FetchOptions<T = unknown> = {
  method?: HttpMethod;
  body?: Body;
  params?: Params;
  onSuccess?: (data: T) => void;
  onError?: (error: StrawError) => void;
  onMessages?: (messages: ServerMessage[]) => void;
};
