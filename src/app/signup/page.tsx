'use client'
import React, { useContext, useState } from 'react';
import styles from '@/assets/styles/pages/login.module.sass';
import { StoreNotesContext } from '@/contexts/StoreNotesProviders';
import LoadingPage from "@/components/Loading/loading"
import Link from 'next/link';

export default function Signup() {
    const {Loading} =useContext(StoreNotesContext)
    const [email, SetEmail] = useState<string>('');
    const [password, SetPassword] = useState<string>('');
    return (
        <div className={styles.container}>
            {Loading && <LoadingPage />}
            <div className={styles.background}>
                <div className={styles.shape}></div>
                <div className={styles.shape}></div>
            </div>
            <form className={styles.itensForm}>
                <h3>Create Login</h3>
                <label htmlFor="username">Username</label>
                <input
                    type="email"
                    placeholder="Email "
                    id="username"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        SetEmail(e.target.value)
                    }
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        SetPassword(e.target.value)
                    }
                />

                <button className={styles.btnLogin} >
                    Create
                </button>
                <div className={styles.social}>
                    <span>Back to login? </span>
                    <Link href="/">click here </Link>
                </div>
            </form>
        </div>
    );
}
