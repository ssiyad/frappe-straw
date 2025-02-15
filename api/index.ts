/**
 * Make an API request.
 * @param url - URL to make request to.
 * @param method - HTTP method to use.
 * @param body - Data to send in request.
 * @param params - Query parameters to send in request.
 * @param makeParams - Function to make query parameters.
 * @returns Promise
 */
export function api(args: {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options';
  body?: Record<string, any>;
  params?: Record<string, any>;
  makeParams?: () => Record<string, any>;
}) {
  const prefix = '/api/method/';
  const url = args.url.startsWith('/') ? args.url : prefix + args.url;
  const method = args.method || 'get';
  const params = args.makeParams ? args.makeParams() : args.params;
  const data = args.body;

  return window.straw.client.request({
    url,
    method,
    params,
    data,
  });
}
