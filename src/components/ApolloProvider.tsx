'use client';

import { ApolloProvider as BaseApolloProvider } from '@apollo/client';
import { createApolloClient } from '@/lib/graphql';
import { ReactNode } from 'react';

interface ApolloProviderProps {
  children: ReactNode;
}

export default function ApolloProvider({ children }: ApolloProviderProps) {
  const client = createApolloClient();
  
  return (
    <BaseApolloProvider client={client}>
      {children}
    </BaseApolloProvider>
  );
} 