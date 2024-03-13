import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { worker } from './mocks/worker';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Modal from 'react-modal';
import axios from 'axios';
import { getClient } from './queryClient';

if (import.meta.env.DEV) {
  worker.start();
}
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

axios.defaults.withCredentials = true;
Modal.setAppElement('#root');
