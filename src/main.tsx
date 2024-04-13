import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AuthContextProvider } from './context/AuthContext.tsx';
import { ModalProvider } from './context/ModalContext.tsx';
import { SocketContextProvider } from './context/SocketContext.tsx';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);
