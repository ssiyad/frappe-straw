export interface DocumentMetaField {
  fieldname: string;
  label: string;
  fieldtype: string;
  options?: string;
  reqd?: number;
  default?: any;
  hidden?: number;
  read_only?: number;
  in_list_view?: number;
  in_standard_filter?: number;
  [key: string]: any;
}

export interface DocumentMetaPermission {
  permlevel: number;
  read: number;
  write: number;
  create: number;
  delete: number;
  submit: number;
  cancel: number;
  amend: number;
  report: number;
  export: number;
  print: number;
  email: number;
  share: number;
  [key: string]: any;
}

export interface DocumentMeta {
  name: string;
  fields: DocumentMetaField[];
  permissions: DocumentMetaPermission[];
  is_submittable?: number;
  is_tree?: number;
  allow_import?: number;
  quick_entry?: number;
  title_field?: string;
  image_field?: string;
  sort_field?: string;
  sort_order?: string;
  hide_toolbar?: number;
  [key: string]: any;
}
