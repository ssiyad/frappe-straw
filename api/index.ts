import { straw } from '../shared';

/**
 * Make an API request.
 * @param url - URL to make request to.
 * @param method - HTTP method to use.
 * @param body - Data to send in request.
 * @param params - Query parameters to send in request.
 * @param makeParams - Function to make query parameters.
 * @returns Promise
 */
export const api = (args: {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options';
  body?: Record<string, any>;
  params?: Record<string, any>;
  makeParams?: () => Record<string, any>;
}) => {
  const baseURL = args.url.startsWith('http') ? '' : undefined;
  const url = args.url;
  const method = args.method || 'get';
  const params = args.makeParams ? args.makeParams() : args.params;
  const data = args.body;

  return straw.client.request({
    baseURL,
    url,
    method,
    params,
    data,
  });
};
