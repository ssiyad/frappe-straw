import { api } from '../api';
import { HttpMethod, JsonCompatible } from '../types';

export class Resource<T = unknown> {
  fetched: boolean = false;
  loading: boolean = false;
  data!: T;

  constructor(
    readonly url: string,
    readonly method: HttpMethod = 'get',
    readonly body?: Record<string, any>,
    readonly params?: Record<string, any>,
    readonly makeParams?: () => Record<string, any>,
    readonly placeholder?: T,
    readonly cache?: JsonCompatible,
  ) {
    const prefix = '/api/method/';
    const external = url.startsWith('http');
    const full = external || url.startsWith('/');
    this.url = full ? url : prefix + url;
    this.method = method ?? 'get';
    if (placeholder) this.data = placeholder;
    this.refresh();
  }

  /** Refresh the resource. Fetch latest data. */
  async refresh() {
    this.loading = true;
    this.data = await api<T>({
      url: this.url,
      method: this.method,
      params: this.makeParams ? this.makeParams() : this.params,
      body: this.body,
      cache: this.cache,
    }).then((data) => {
      this.data = data;
      this.fetched = true;
      this.loading = false;
      return data;
    });
  }

  /** Reset resource data to `placeholder` */
  reset() {
    if (this.placeholder) this.data = this.placeholder;
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
  method?: HttpMethod;
  body?: Record<string, any>;
  params?: Record<string, any>;
  makeParams?: () => Record<string, any>;
  placeholder?: any;
  cache?: JsonCompatible;
}) => {
  return new Resource(url, method, body, params, makeParams, placeholder);
};
