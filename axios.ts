import axios, {
  AxiosInstance,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from "axios";
import { version as FRAPPE_CLIENT_VERSION } from "./package.json";

declare global {
  interface Window {
    csrf_token: string;
  }
}

const HEADER_SITE_NAME = "X-Frappe-Site-Name";
const HEADER_CSRF_TOKEN = "X-Frappe-CSRF-Token";
const HEADER_FRAPPE_CLIENT_VERSION = "X-Frappe-Client-Version";

type Args = {
  url: string;
  token?: () => string;
  tokenType?: "Bearer" | "token";
};

/**
 * Create an axios client with necessary headers.
 *
 * @param args - Arguments to create axios client.
 * @returns AxiosInstance
 */
export const createAxios = (args: Args): AxiosInstance => {
  // Create axios instance.
  const a = axios.create({
    baseURL: args.url,
    headers: headers(args),
    withCredentials: true,
  });

  // Add response interceptors.
  a.interceptors.response.use(exRes, handleErr);

  return a;
};

/**
 * Create headers for axios request.
 *
 * @param args - Arguments to create headers.
 * @returns RawAxiosRequestHeaders
 */
const headers = (args: Args): RawAxiosRequestHeaders => {
  // Init default headers.
  const headers: RawAxiosRequestHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    [HEADER_FRAPPE_CLIENT_VERSION]: FRAPPE_CLIENT_VERSION,
  };

  // Set token if provided.
  if (args.tokenType && args.token) {
    headers.Authorization = [args.tokenType, args.token()].join(" ");
  }

  // In case of server environments, return headers.
  if (typeof window == "undefined" || typeof document == "undefined") {
    return headers;
  }

  // Set site name if available.
  if (window.location) {
    if (args.url !== window.location.origin) {
    } else {
      headers[HEADER_SITE_NAME] = window.location.hostname;
    }
  }

  // Set CSRF token if available.
  if (window.csrf_token && window.csrf_token !== "{{ csrf_token }}") {
    headers[HEADER_CSRF_TOKEN] = window.csrf_token;
  }

  return headers;
};

/**
 * Extract actual response from axios response.
 */
const exRes = (r: AxiosResponse) => {
  return r.data.message;
};

/**
 * Handle error from axios response.
 */
const handleErr = (e: any) => {
  return Promise.reject(e);
};
