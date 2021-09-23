import Image from 'next/image';
import * as React from 'react';
import { ReactElement } from 'react';
import MyAppLayout from '../components/layout/MyAppLayout';

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
  return <MyAppLayout title="Eztimate App">{page}</MyAppLayout>;
};

export default IndexPage;
