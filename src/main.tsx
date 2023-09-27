import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '@/redux/configStore';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import App from './App';
import GlobalStyle from './GlobalStyle';
import { Theme } from './theme';
import Modal from 'react-modal';
import { worker } from "./mocks/browser";

const persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement);

if (process.env.NODE_ENV === "development") {
  worker.start()
}

root.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    {/* </PersistGate> */}
  </Provider>,
);

Modal.setAppElement('#root')
