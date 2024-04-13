import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AuthContextProvider } from './context/AuthContext.tsx';
import { ModalProvider } from './context/ModalContext.tsx';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);
