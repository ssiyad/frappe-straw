import TTLCache from '@isaacs/ttlcache';
import { AxiosInstance } from 'axios';
import { createContext, PropsWithChildren, useMemo } from 'react';
import { createAxios } from '../axios';

const defaultCache = new TTLCache({
  max: 1000,
  ttl: 1000 * 60 * 5,
});

export const StrawContext = createContext<{
  client: AxiosInstance;
  cache: TTLCache<unknown, unknown>;
}>({
  client: {} as AxiosInstance,
  cache: defaultCache,
});

/**
 * Straw provider. Provides an Axios client and cache to the rest of the app.
 * Must be used before any other Straw hooks.
 * @param url - Base URL for the API.
 * @param token - Function to get an auth token.
 * @param tokenType - Type of token to use.
 * @param children - Child components.
 * @returns Straw Provider
 */
export const Straw = ({
  url,
  token,
  tokenType,
  children,
}: PropsWithChildren<{
  url: string;
  token?: () => string;
  tokenType?: 'Bearer' | 'token';
}>) => {
  const client = useMemo(
    () => createAxios({ url, token, tokenType }),
    [url, token, tokenType],
  );
  const cache = useMemo(
    () => new TTLCache({ max: 1000, ttl: 1000 * 60 * 5 }),
    [],
  );

  return (
    <StrawContext.Provider value={{ client, cache }}>
      {children}
    </StrawContext.Provider>
  );
};
