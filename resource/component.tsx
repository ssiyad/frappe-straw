import React from 'react';
import { Resource, useResource } from '.';
import { JsonCompatible } from '../types';

export const StrawResource = <T = JsonCompatible,>({
  url,
  options,
  children,
}: {
  url: Parameters<typeof useResource<T>>[0];
  options?: Parameters<typeof useResource<T>>[1];
  children: (resource: Resource<T>) => React.ReactNode;
}) => {
  return children(useResource<T>(url, options));
};
