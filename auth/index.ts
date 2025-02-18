import { api } from '../api';

/**
 * Login to Frappe server, using provided credentials.
 * @param username - Username to login with.
 * @param password - Password to login with.
 * @returns Promise
 */
export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return api({
    url: 'login',
    method: 'post',
    body: {
      usr: username,
      pwd: password,
    },
  })
    .then(() => 'Successfully logged in')
    .catch(() => 'Failed to log in');
};

/**
 * Logout from Frappe server.
 * @returns Promise
 */
export const logout = async () => {
  return api({
    url: 'logout',
    method: 'post',
  })
    .then(() => 'Successfully logged out')
    .catch(() => 'Failed to log out');
};

/**
 * Get logged in user.
 * @returns Logged in user's id
 */
export const currentUser = async () => {
  return api({
    url: 'frappe.auth.get_logged_user',
    method: 'get',
  })
    .then((res) => res.data.message as string)
    .catch(() => 'Failed to get user');
};
