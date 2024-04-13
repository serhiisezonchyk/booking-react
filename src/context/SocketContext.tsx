import React, { createContext, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
interface SocketContextState {
  socket?: Socket;
}
export const SocketContext = createContext<SocketContextState>({});
export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    setSocket(io(import.meta.env.VITE_APP_SOCKET_URL));
  }, []);

  return <SocketContext.Provider value={{ socket: socket! }}>{children}</SocketContext.Provider>;
};
