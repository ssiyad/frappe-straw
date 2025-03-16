/**
 * Frappe's server messages. Used to display alerts and errors.
 */
export type ServerMessage = {
  message: string;
  title?: string;
  indicator?: 'blue' | 'green' | 'orange' | 'red' | 'yellow';
  raise_exception?: 0 | 1;
  __frappe_exc_id?: string;
};
