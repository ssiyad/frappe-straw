export type StrawError = {
  status: number;
  message: string;
  title?: string;
  indicator?: 'blue' | 'green' | 'orange' | 'red' | 'yellow';
  raise_exception?: boolean;
  __frappe_exc_id?: string;
};
