import { Api } from "../api";

export type ConstructorArgs = {
  api: Api;
};

export type LoginArgs = {
  username: string;
  password: string;
};

export type LoginResponse = string;
export type LoggedInUser = string;
export type LogoutResponse = void;
