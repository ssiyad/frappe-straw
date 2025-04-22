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

  // Parse server messages string to JSON.
  const err: ServerMessage = JSON.parse(
    JSON.parse(serverMessagesStr).at(0) ?? null,
  );

  // If the error is a server message, return it.
  if (err) {
    return {
      ...err,
      raise_exception: !!err.raise_exception,
      status,
    };
  }

  // If the error is a validation error, return it.
  // @ts-ignore `message` may exist on the response object.
  if (status > 400 && response?.data?.message) {
    return {
      // @ts-ignore `message` may exist on the response object.
      message: response.data.message,
      status,
    };
  }

  // If the error is a network error, return it.
  return {
    message,
    status,
  };
};
