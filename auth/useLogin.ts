import { useResource } from '../resource';
import type { FetchOptions, ResponseMessage } from '../types';

interface R extends ResponseMessage {
  home_page: string;
  full_name: string;
}

const method = 'post';
const apiMethod = 'login';

/**
 * Login to Frappe server, using provided credentials.
 * @param username - Username to login with.
 * @param password - Password to login with.
 * @returns `Resource` object.
 */
export const useLogin = ({ onSuccess, onError }: FetchOptions<R> = {}) => {
  const resource = useResource<R>(apiMethod, {
    method,
    fetchOnMount: false,
    onSuccess,
    onError,
  });

  const login = (username: string, password: string) => {
    return resource.refresh({
      body: {
        usr: username,
        pwd: password,
      },
    });
  };

  return {
    ...resource,
    login,
  };
};
