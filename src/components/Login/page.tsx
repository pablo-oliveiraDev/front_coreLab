'use client';
import styles from '@/assets/styles/pages/login.module.sass';
import LoadingPage from '@/components/Loading/loading';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { StoreNotesContext } from '@/contexts/StoreNotesProviders';

// async function Login(email: string, password: string) {
//   let newData = {
//     email: email,
//     password: password
//   };
//   const response = await fetch(`${process.env.REACT_APP_API}/login`, {
//     cache: 'force-cache',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     next: { revalidate: false },
//     body: JSON.stringify(newData)
//   });
//   console.log(response.status);
//   dataUser = await response.json();
//   console.log(dataUser);
// }
export default function UsrLogin() {
    const { Login, Loading }: any = useContext(StoreNotesContext);
    const [email, SetEmail] = useState<string>('');
    const [password, SetPassword] = useState<string>('');

    const SaveBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        Login(email, password);
        SetEmail('');
        SetPassword('');
    };

    return (
        <div className={styles.container}>
            {Loading && <LoadingPage />}
            <div className={styles.background}>
                <div className={styles.shape}></div>
                <div className={styles.shape}></div>
            </div>
            <form className={styles.itensForm}>
                <h3>Login Here</h3>

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

                <button className={styles.btnLogin} onClick={SaveBtn}>
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
