import { AxiosInstance } from "axios";

export type ConstructorArgs = {
  axios: AxiosInstance;
};

export type LoginArgs = {
  username: string;
  password: string;
};

export type LoginResponse = string;
export type LoggedInUser = string;
export type LogoutResponse = void;
