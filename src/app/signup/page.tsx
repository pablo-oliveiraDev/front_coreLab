'use client';
import React, { useContext, useState } from 'react';
import styles from '@/assets/styles/pages/login.module.sass';
import { StoreNotesContext } from '@/contexts/StoreNotesProviders';
import * as T from '@/components/Types/contextTypes';
import LoadingPage from '@/components/Loading/loading';
import Link from 'next/link';

export default function Signup() {
    const { Loading, CreateUser }: T.InitialValue =
        useContext(StoreNotesContext);
    const [UserName, SetUserName] = useState<string>('');
    const [Email, SetEmail] = useState<string>('');
    const [Password, SetPassword] = useState<string>('');
    const [UserImage, SetUserImage] = useState<string>('');
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
                    type="text"
                    placeholder="Name "
                    id="username"
                    value={UserName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        SetUserName(e.target.value)
                    }
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    value={Email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        SetEmail(e.target.value)
                    }
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={Password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        SetPassword(e.target.value)
                    }
                />
                <label htmlFor="UserImage">Image</label>
                <input
                    type="file"
                    placeholder="image"
                    id="UserImage"
                    value={UserImage}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        SetUserImage(e.target.value)
                    }
                />

                <button className={styles.btnLogin}>Create</button>
                <div className={styles.social}>
                    <span>Back to login? </span>
                    <Link href="/">click here </Link>
                </div>
            </form>
        </div>
    );
}
