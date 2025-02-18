export type BaseDocument = {
  creation: string;
  docstatus: 0 | 1 | 2;
  idx: number;
  modified: string;
  modified_by: string;
  name: string;
  owner: string;
  parent?: any;
  parentfield?: any;
  parenttype?: any;
};
