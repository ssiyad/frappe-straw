import { AxiosInstance } from "axios";
import { createAxios } from "./axios";
import { Auth } from "./auth";
import { Api } from "./api";

type Args = {
  url: string;
  token?: () => string;
  tokenType?: "Bearer" | "token";
};

export class App {
  private readonly axios: AxiosInstance;

  /**
   * Collection of methods to handle authentication related operations. This
   * include actions such as login, logout, etc.
   */
  readonly auth: Auth;

  /**
   * Bare-bone Api client to interact with Frappe server, with commonly used
   * http methods.
   */
  readonly api: Api;

  constructor(args: Args) {
    this.axios = createAxios(args);
    this.api = new Api({ axios: this.axios });
    this.auth = new Auth({ api: this.api });
  }
}
