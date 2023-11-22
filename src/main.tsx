import ReactDOM from 'react-dom/client';
import App from './App';
import { worker } from './mocks/worker';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Modal from 'react-modal';

if (import.meta.env.DEV) {
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <GlobalStyle />
    <App />
  </BrowserRouter>,
);

Modal.setAppElement('#root');
