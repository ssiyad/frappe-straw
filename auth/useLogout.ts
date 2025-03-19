import { useResource } from '../resource';
import type { FetchOptions, ResponseMessage } from '../types';

type R = ResponseMessage & {
  home_page: string;
  full_name: string;
};

const method = 'post';
const apiMethod = 'logout';

/**
 * Logout from Frappe server.
 * @returns Promise
 */
export const useLogout = ({ onSuccess, onError }: FetchOptions<R> = {}) => {
  const resource = useResource<R>(apiMethod, {
    method,
    fetchOnMount: false,
    onSuccess,
    onError,
  });

  return {
    ...resource,
    logout: resource.refresh,
  };
};
