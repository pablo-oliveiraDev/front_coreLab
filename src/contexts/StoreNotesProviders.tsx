'use client';
import { createContext, useEffect, useState } from 'react';
import {
  UserContextProps,
  InitialValue
} from '@/components/Types/contextTypes';
import Api from '@/components/Services/api';

export const StoreNotesContext = createContext<InitialValue>(
  {} as InitialValue
);

export const StoreNotesProvider = ({ children }: UserContextProps) => {
  const [Loading, SetLoading] = useState<boolean>(false);
  const [User, SetUser] = useState<Object>({});

  async function Login(email: string, password: string) {
    let NewData = {
      email: email,
      password: password
    };

    try {
      SetLoading(true);
      await Api.post('/login', NewData).then(res => {
        // let DataUser = {
        //   id: res.data[0].id,
        //   userName: res.data.userName,
        //   email: res.data.email,
        //   password: res.data.password,
        //   createdAt: res.data.createdAt
        // };
        SetUser(res.data);
      });
    } catch (err) {
      console.log('erro login :' + err);
    } finally {
      SetLoading(false);
    }
  }

  console.log(User);
  return (
    <StoreNotesContext.Provider
      value={{
        Loading,
        Login
      }}
    >
      {children}
    </StoreNotesContext.Provider>
  );
};

export default StoreNotesProvider;
