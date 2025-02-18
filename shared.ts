import { AxiosInstance } from 'axios';

type Straw = {
  client: AxiosInstance;
};

export const straw: Straw = {
  client: {} as AxiosInstance,
};
