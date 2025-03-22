export interface BaseDocument {
  doctype: string;
  name: string;
  creation?: string;
  docstatus?: 0 | 1 | 2;
  idx?: number;
  modified?: string;
  modified_by?: string;
  owner?: string;
}
