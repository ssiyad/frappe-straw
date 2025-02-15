import { api } from '../api';

class Resource {
  data: any;

  constructor(
    private readonly url: string,
    private readonly method?:
      | 'get'
      | 'post'
      | 'put'
      | 'delete'
      | 'patch'
      | 'options',
    private readonly body?: Record<string, any>,
    private readonly params?: Record<string, any>,
    private readonly makeParams?: () => Record<string, any>,
    private readonly placeholder?: any,
  ) {
    this.data = placeholder;
    this.refresh();
  }

  /** Refresh the resource. Fetch latest data. */
  refresh() {
    this.data = api({
      url: this.url,
      method: this.method,
      body: this.body,
      params: this.params,
      makeParams: this.makeParams,
    }).then((response) => (this.data = response.data));
  }

  /** Reset resource data to `placeholder` */
  reset() {
    this.data = this.placeholder;
  }
}

export function createResource({
  url,
  method,
  body,
  params,
  makeParams,
  placeholder,
}: {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options';
  body?: Record<string, any>;
  params?: Record<string, any>;
  makeParams?: () => Record<string, any>;
  placeholder?: any;
}) {
  return new Resource(url, method, body, params, makeParams, placeholder);
}
