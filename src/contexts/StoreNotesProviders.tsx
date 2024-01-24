"use client";
import { createContext, useState } from "react";
import api from "@/components/Services/api";

export const StoreNotesContext = createContext({});

export const StoreNotesProvider = ({ children }: any) => {
  const [loading, SetLoading] = useState<boolean>();
  const [user, SetUser] = useState<string[]>();
  const Login = async (email: string, password: string) => {
    SetLoading(true);
    let newData = {
      email: email,
      password: password,
    };
    console.log(loading);
    await api
      .post(`${process.env.API}/login`, newData)
      .then((res) => {
        console.log(res.data.status.json());
        let dataUser: any = {
          id: res.data.id,
          userName: res.data.userName,
          email: res.data.email,
          userImage: res.data.userImage,
        };
        SetUser(dataUser);
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

    
  return (
    <StoreNotesContext.Provider
      value={{
        Login,
        loading,
      }}>
      {children}
    </StoreNotesContext.Provider>
  );
};

export default StoreNotesProvider;
