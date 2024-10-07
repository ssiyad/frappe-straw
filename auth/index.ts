import { AxiosInstance } from "axios";
import {
  ConstructorArgs,
  LoggedInUser,
  LoginArgs,
  LoginResponse,
  LogoutResponse,
} from "./types";

/**
 * Auth class to handle authentication related operations.
 */
export class Auth {
  private readonly axios: AxiosInstance;
  private readonly endpoints = {
    login: "/api/method/login",
    logout: "/api/method/logout",
    user: "/api/method/frappe.auth.get_logged_user",
  };

  constructor(args: ConstructorArgs) {
    this.axios = args.axios;
  }

  /**
   * Login to Frappe server, using provided credentials.
   *
   * @param args - Arguments to login.
   * @returns Login response
   */
  async login(args: LoginArgs) {
    return this.axios.post<LoginResponse>(this.endpoints.login, {
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
    return this.axios.post<LogoutResponse>(this.endpoints.logout);
  }

  /**
   * Get logged in user.
   *
   * @returns Logged in user
   */
  async user() {
    return this.axios.get<LoggedInUser>(this.endpoints.user);
  }
}
