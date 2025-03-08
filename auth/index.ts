import { useResource } from '../resource';

/**
 * Login to Frappe server, using provided credentials.
 * @param username - Username to login with.
 * @param password - Password to login with.
 * @returns Promise
 */
export const useLogin = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return useResource<{
    message: 'Logged In';
    home_page: string;
    full_name: string;
  }>('login', {
    method: 'post',
    body: {
      usr: username,
      pwd: password,
    },
  });
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
export const useCurrentUser = async () => {
  return useResource('frappe.auth.get_logged_user', {
    method: 'get',
  });
};
