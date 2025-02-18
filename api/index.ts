import { straw } from '../shared';

/**
 * Make an API request.
 * @param url - URL to make request to.
 * @param method - HTTP method to use.
 * @param body - Data to send in request.
 * @param params - Query parameters to send in request.
 * @returns Promise
 */
export const api = ({
  url,
  method,
  params,
  body,
}: {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options';
  body?: Record<string, any>;
  params?: Record<string, any>;
}) => {
  return straw.client.request({
    baseURL: url.startsWith('http') ? '' : undefined,
    url,
    method,
    params,
    data: body,
  });
};
