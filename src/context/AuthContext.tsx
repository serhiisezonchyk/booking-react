import React, { createContext, useEffect, useState } from 'react';
import { User } from '../data/types';

interface AuthContextState {
  user: User | null;
  updateUser?: (data: User | null) => void;
}
export interface AuthInfo {
  user: {
    name: string;
  };
}
export const AuthContext = createContext<AuthContextState>({ user: null });
export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(JSON.parse(localStorage.getItem('user')!) || null);
  const updateUser = (data: User | null) => {
    setCurrentUser(data);
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);
  return <AuthContext.Provider value={{ user: currentUser, updateUser }}>{children}</AuthContext.Provider>;
};
