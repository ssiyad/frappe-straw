import { AxiosInstance } from "axios";
import { createAxios } from "./axios";
import { Auth } from "./auth";

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

  constructor(args: Args) {
    this.axios = createAxios(args);
    this.auth = new Auth({ axios: this.axios });
  }
}
