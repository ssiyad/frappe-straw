import { AxiosInstance } from "axios";

export type ConstructorArgs = {
  axios: AxiosInstance;
};

export type Method = "get" | "post" | "put" | "delete";
export type Path = string;
export type Args = Record<string, any>;
