import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { useUser } from '@auth0/nextjs-auth0';

export default function Home() {
  const { user, error, isLoading } = useUser();
  return (
    <div>
      <main>
        <h1>
          Welcome to <a href="https://nextjs.org">Eztimate!</a>
        </h1>

        <p>
          {isLoading && <div>Loading...</div>}
          {error && <div>{error.message}</div>}
          {user && (
            <div>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <Link href={'/api/auth/logout'}>Logout</Link>
            </div>
          )}
          {!isLoading && !error && !user && <Link href={'/api/auth/login'}>Login</Link>}
        </p>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
