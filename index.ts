export { api } from './api';
export { createDocumentResource } from './document-resource';
export { createListResource } from './list-resource';
export { createResource } from './resource';

import { AxiosInstance } from 'axios';
import { createAxios } from './axios';

declare global {
  interface Window {
    straw: {
      client: AxiosInstance;
    };
  }
}

export function init(args: {
  url: string;
  token?: () => string;
  tokenType?: 'Bearer' | 'token';
}) {
  window.straw.client = createAxios(args);
}
