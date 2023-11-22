import ReactDOM from 'react-dom/client';
import App from './App';
import { worker } from './mocks/worker';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Modal from 'react-modal';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

if (import.meta.env.DEV) {
  worker.start();
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </QueryClientProvider>,
);

Modal.setAppElement('#root');
