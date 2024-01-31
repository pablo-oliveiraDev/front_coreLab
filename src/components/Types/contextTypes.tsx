import { ReactNode } from 'react';

export type UserContextProps = {
  children: ReactNode;
};

export type InitialValue = {
  Loading: boolean;
  Login: (email: string, password: string) => void;    
};