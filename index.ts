export { api } from './api';
export { createDocumentResource } from './document-resource';
export { createListResource } from './list-resource';
export { createResource } from './resource';

import { createAxios } from './axios';
import { straw } from './shared';

export const init = (args: {
  url: string;
  token?: () => string;
  tokenType?: 'Bearer' | 'token';
}) => {
  straw.client = createAxios(args);
};
