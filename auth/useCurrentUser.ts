import { useResource } from '../resource';

type R = {
  message: string;
};

const apiMethod = 'frappe.auth.get_logged_user';

/**
 * Get logged in user.
 * @returns Logged in user's id
 */
export const useCurrentUser = () => {
  const resource = useResource<R>(apiMethod);

  return {
    ...resource,
    data: resource.data?.message,
  };
};
