/**
 * Response message type. This is the most common response type.
 */
export type ResponseMessage<T = string> = {
  message: T;
};
