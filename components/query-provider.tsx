'use client';
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from '@tanstack/react-query';
import { type ReactNode } from 'react';

/**
 * Sets up the QueryClientProvider from @tanstack/react-query.
 * @desc See: https://tanstack.com/query/v4/docs/react/overview
 */

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  mutationCache: new MutationCache(),
});

export function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export { queryClient };
