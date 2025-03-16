export type JsonCompatible =
  | string
  | number
  | boolean
  | null
  | JsonCompatible[]
  | { [key: string]: JsonCompatible };
