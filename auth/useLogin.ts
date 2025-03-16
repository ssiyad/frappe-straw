import { useResource } from '../resource';
import { ResponseMessage } from '../types';

type R = ResponseMessage & {
  home_page: string;
  full_name: string;
};

const method = 'post';
const apiMethod = 'login';

/**
 * Login to Frappe server, using provided credentials.
 * @param username - Username to login with.
 * @param password - Password to login with.
 * @returns `Resource` object.
 */
export const useLogin = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const resource = useResource<R>(apiMethod, {
    method,
    fetchOnMount: false,
    body: {
      usr: username,
      pwd: password,
    },
  });

  return {
    ...resource,
    login: resource.refresh,
  };
};
