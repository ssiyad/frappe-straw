import { AxiosInstance } from "axios";
import { createAxiosClient } from "./axios";

type Args = {
  url: string;
  token?: () => string;
  tokenType?: "Bearer" | "token";
};

export class App {
  readonly axios: AxiosInstance;

  constructor(args: Args) {
    this.axios = createAxiosClient(args);
  }
}
