import { useResource } from '../resource';
import { ResponseMessage } from '../types';

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
export const useLogout = () => {
  const resource = useResource<R>(apiMethod, {
    method,
    fetchOnMount: false,
  });

  return {
    ...resource,
    logout: resource.refresh,
  };
};
