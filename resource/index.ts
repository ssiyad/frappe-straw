import { api } from '../api';

export class Resource {
  data: any;
  fetched: boolean = false;
  loading: boolean = false;

  constructor(
    readonly url: string,
    readonly method?: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options',
    readonly body?: Record<string, any>,
    readonly params?: Record<string, any>,
    readonly makeParams?: () => Record<string, any>,
    readonly placeholder?: any,
  ) {
    const prefix = '/api/method/';
    const external = url.startsWith('http');
    const full = external || url.startsWith('/');
    this.url = full ? url : prefix + url;
    this.method = method ?? 'get';
    this.data = placeholder;
    this.refresh();
  }

  /** Refresh the resource. Fetch latest data. */
  refresh() {
    this.loading = true;
    this.data = api({
      url: this.url,
      method: this.method,
      body: this.body,
      params: this.params,
      makeParams: this.makeParams,
    }).then((response) => {
      this.data = response.data;
      this.fetched = true;
      this.loading = false;
    });
  }

  /** Reset resource data to `placeholder` */
  reset() {
    this.data = this.placeholder;
  }
}

export const createResource = ({
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
}) => {
  return new Resource(url, method, body, params, makeParams, placeholder);
};
