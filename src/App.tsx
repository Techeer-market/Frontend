import { useRoutes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { getClient } from './queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { routes } from './Router';
import React from 'react';
import Loading from './components/Loading';

function App() {
  const queryClient = getClient();
  const elem = useRoutes(routes);

  return (
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback={<Loading />}>{elem}</React.Suspense>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;