import Image from "next/image";
import styles from '@/assets/styles/pages/login.module.sass'
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>
      <form className={styles.itensForm}>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" />

        <button className={styles.btnLogin}>Log In</button>
        <div className={styles.social}>
          <span>Dont have login? </span>
          <Link href="#">click here for sign up</Link>
        </div>
      </form>
    </div>
  );
}
