export { api } from './api';
export { useDocumentResource } from './document-resource';
export { useListResource } from './list-resource';
export { useResource } from './resource';
import { createAxios } from './axios';
import { straw } from './shared';

export const init = (args: {
  url: string;
  token?: () => string;
  tokenType?: 'Bearer' | 'token';
}) => {
  straw.client = createAxios(args);
};
