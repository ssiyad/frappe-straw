import TTLCache from '@isaacs/ttlcache';
import { AxiosInstance } from 'axios';
import { createContext, PropsWithChildren, useMemo } from 'react';
import { createAxios } from '../axios';
import { defaultCacheTTL } from '../consts';
import type { ServerMessage, StrawError } from '../types';

const defaultCache = new TTLCache({
  max: 1000,
  ttl: defaultCacheTTL,
});

export const StrawContext = createContext<{
  client: AxiosInstance;
  cache: TTLCache<unknown, unknown>;
  onError?: (error: StrawError) => void;
  onMessages?: (messages: ServerMessage[]) => void;
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
  onError,
  onMessages,
  children,
}: PropsWithChildren<{
  url?: string;
  token?: () => string;
  tokenType?: 'Bearer' | 'token';
  onError?: (error: StrawError) => void;
  onMessages?: (messages: ServerMessage[]) => void;
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
    <StrawContext.Provider value={{ client, cache, onError, onMessages }}>
      {children}
    </StrawContext.Provider>
  );
};
