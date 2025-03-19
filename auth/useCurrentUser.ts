import { useResource } from '../resource';
import type { ResponseMessage } from '../types';

const apiMethod = 'frappe.auth.get_logged_user';

/**
 * Get logged in user.
 * @returns Logged in user's id
 */
export const useCurrentUser = () => {
  return useResource<ResponseMessage, string>(apiMethod, {
    transform: (data) => data.message,
  });
};
