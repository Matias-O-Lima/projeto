"use client";

import React from 'react';

import { ToastContainer } from 'react-toastify';

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

export default function Providers({ children }: any) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}
