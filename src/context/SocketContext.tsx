import React, { createContext, useContext, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { AuthContext } from './AuthContext';
interface SocketContextState {
  socket?: Socket;
}
export const SocketContext = createContext<SocketContextState>({});
export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    setSocket(io(import.meta.env.VITE_APP_API_SOCKET_URL));
  }, []);
  useEffect(() => {
    user && socket?.emit('newUser', user.id);
    return()=>{
      socket?.emit('disconnect', user?.id);
    }
  }, [user, socket]);
  return <SocketContext.Provider value={{ socket: socket! }}>{children}</SocketContext.Provider>;
};
