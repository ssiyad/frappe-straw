import { AxiosInstance, AxiosResponse } from "axios";
import { Args, ConstructorArgs, Method, Path } from "./types";

export class Api {
  private readonly axios: AxiosInstance;
  private readonly url = "/api/method/";

  constructor(args: ConstructorArgs) {
    this.axios = args.axios;
  }

  private async c<T>(
    method: Method,
    path: Path,
    args?: Args,
  ): Promise<AxiosResponse<T>> {
    return this.axios[method](this.url + path, args);
  }

  /**
   * @template T - Return type of the Api call
   * @param path - Frappe endpoint
   * @param args - Arguments to pass to the endpoint (optional)
   * @returns Promise<AxiosResponse<T>>
   */
  get<T>(path: Path, args?: Args) {
    return this.c<T>("get", path, args);
  }

  /**
   * @template T - Return type of the Api call
   * @param path - Frappe endpoint
   * @param args - Arguments to pass to the endpoint (optional)
   * @returns Promise<AxiosResponse<T>>
   */
  post<T>(path: Path, args?: Args) {
    return this.c<T>("post", path, args);
  }

  /**
   * @template T - Return type of the Api call
   * @param path - Frappe endpoint
   * @param args - Arguments to pass to the endpoint (optional)
   * @returns Promise<AxiosResponse<T>>
   */
  put<T>(path: Path, args?: Args) {
    return this.c<T>("put", path, args);
  }

  /**
   * @template T - Return type of the Api call
   * @param path - Frappe endpoint
   * @param args - Arguments to pass to the endpoint (optional)
   * @returns Promise<AxiosResponse<T>>
   */
  delete<T>(path: Path, args?: Args) {
    return this.c<T>("delete", path, args);
  }
}
