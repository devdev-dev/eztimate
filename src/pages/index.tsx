import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';

import {useUser} from "@auth0/nextjs-auth0";

export default function Home() {
    const {user, error, isLoading} = useUser();
    return (

        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="https://nextjs.org">Eztimate!</a>
                </h1>

                <p className={styles.description}>
                    {isLoading && <div>Loading...</div>}
                    {error && <div>{error.message}</div>}
                    {user && (<div>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        <a href="/api/auth/logout">Logout</a>
                    </div>)}
                    {!isLoading && !error && !user && <a href="/api/auth/login">Login</a>}
                </p>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
          </span>
                </a>
            </footer>
        </div>
    );
}
