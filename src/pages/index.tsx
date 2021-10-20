import Image from 'next/image';
import * as React from 'react';
import { ReactElement } from 'react';
import AppLayout from '../components/layout/AppLayout';

const IndexPage = () => {
  return (
    <div>
      <main>
        <h1>
          Welcome to <a href="https://nextjs.org">Eztimate!</a>
        </h1>
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
};

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout title="Eztimate App">{page}</AppLayout>;
};

export default IndexPage;
