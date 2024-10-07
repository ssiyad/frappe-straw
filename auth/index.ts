import { Api } from "../api";
import {
  ConstructorArgs,
  LoggedInUser,
  LoginArgs,
  LoginResponse,
  LogoutResponse,
} from "./types";

export class Auth {
  private readonly api: Api;
  private readonly endpoints = {
    login: "login",
    logout: "logout",
    user: "frappe.auth.get_logged_user",
  };

  constructor(args: ConstructorArgs) {
    this.api = args.api;
  }

  /**
   * Login to Frappe server, using provided credentials.
   *
   * @param args - Arguments to login.
   * @returns Login response
   */
  async login(args: LoginArgs) {
    return this.api.post<LoginResponse>(this.endpoints.login, {
      usr: args.username,
      pwd: args.password,
    });
  }

  /**
   * Logout from Frappe server.
   *
   * @returns Nothing
   */
  async logout() {
    return this.api.post<LogoutResponse>(this.endpoints.logout);
  }

  /**
   * Get logged in user.
   *
   * @returns Logged in user
   */
  async user() {
    return this.api.get<LoggedInUser>(this.endpoints.user);
  }
}
