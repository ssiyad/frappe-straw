import { type AxiosResponse } from 'axios';
import type { ServerMessage } from '../types';

export const toServerMessages = (response: AxiosResponse): ServerMessage[] => {
  const _server_messages = (response.data as any)._server_messages || '[]';
  return JSON.parse(_server_messages).map(JSON.parse);
};
