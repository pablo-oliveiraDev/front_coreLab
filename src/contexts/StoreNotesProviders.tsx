"use client"
import { createContext, useState } from "react";


export const StoreNotesContext = createContext({});

export const StoreNotesProvider = ({ children }: any) => {
  const [loading, SetLoading] = useState<boolean>();
  const [data, SetData] = useState<string[]>([]);
  const Login = async (email: string, password: string) => {
    SetLoading(true);
    try {
      
      console.log(loading)
      const response = await fetch(`http://localhost:5080/login`, {
        method: "Post",
        body: JSON.stringify({ email:email, password:password }),
      })
      const res = await response.json();
      SetData(res)
      console.log(data)
    } catch (error) {
      console.log(error);
    } finally {
      SetLoading(false)
    }
   
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
