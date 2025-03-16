import { AxiosError } from 'axios';
import type { ServerMessage, StrawError } from '../types';

export const toStrawError = ({
  message,
  response,
  status = 500,
}: AxiosError): StrawError => {
  // Frappe server messages are stored in the _server_messages key.
  // Check `ServerMessage` type for more details.
  const serverMessagesStr = (response?.data as any)._server_messages || '[]';

  const err: ServerMessage = JSON.parse(
    JSON.parse(serverMessagesStr).at(0) ?? null,
  );

  if (err) {
    return {
      ...err,
      raise_exception: !!err.raise_exception,
      status,
    };
  }

  return {
    message,
    status,
  };
};
