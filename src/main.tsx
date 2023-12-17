import ReactDOM from 'react-dom/client';
import App from './App';
import { worker } from './mocks/worker';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Modal from 'react-modal';
import axios from 'axios';
import { QueryCache, QueryClient } from '@tanstack/react-query';

if (import.meta.env.DEV) {
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <GlobalStyle />
    <App />
  </BrowserRouter>,
);

axios.defaults.withCredentials = true;
Modal.setAppElement('#root');
