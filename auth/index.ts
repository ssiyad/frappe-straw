import { useResource } from '../resource';

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
  const resource = useResource<{
    message: 'Logged In';
    home_page: string;
    full_name: string;
  }>('login', {
    method: 'post',
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

/**
 * Logout from Frappe server.
 * @returns Promise
 */
export const useLogout = async () => {
  return useResource('logout', {
    method: 'post',
  });
};

/**
 * Get logged in user.
 * @returns Logged in user's id
 */
export const useCurrentUser = () => {
  const resource = useResource<{
    message: string;
  }>('frappe.auth.get_logged_user', {
    method: 'get',
  });

  return {
    ...resource,
    data: resource.data?.message,
  };
};
