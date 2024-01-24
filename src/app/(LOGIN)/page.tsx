"use client";

import styles from "@/assets/styles/pages/login.module.sass";
import Loading from "@/components/loading/loading";
import Link from "next/link";
import { useContext, useState } from "react";
import { StoreNotesContext } from "@/contexts/StoreNotesProviders";
import Head from "next/head";

export default function Home() {
  const { Login, loading }: any = useContext(StoreNotesContext);
  const [email, SetEmail] = useState<string>('');
  const [password, SetPassword] = useState<string>('');
  const HandleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetEmail(e.target.value);
  };
  const HandlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetPassword(e.target.value);
  };
console.log(password)
  return (
    
    <div className={styles.container}>
      
      {loading && <Loading /> }
      <div className={styles.background}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>
      <form className={styles.itensForm}>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Email "
          id="username"
          value={email}
          onChange={HandleEmail}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={HandlePassword}
        />

        <button
          className={styles.btnLogin}
          onClick={()=>Login(email, password)}>
          Log In
        </button>
        <div className={styles.social}>
          <span>Dont have login? </span>
          <Link href="#">click here for sign up</Link>
        </div>
      </form>
    </div>
  );
}
