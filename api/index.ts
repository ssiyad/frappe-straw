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
    args: Args,
  ): Promise<AxiosResponse<T>> {
    return this.axios[method](this.url + path, args);
  }

  get<T>(path: Path, args: Args) {
    return this.c<T>("get", path, args);
  }

  post<T>(path: Path, args: Args) {
    return this.c<T>("post", path, args);
  }

  put<T>(path: Path, args: Args) {
    return this.c<T>("put", path, args);
  }

  delete<T>(path: Path, args: Args) {
    return this.c<T>("delete", path, args);
  }
}
