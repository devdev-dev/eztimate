import Image from 'next/image';
import * as React from 'react';
import { ReactElement } from 'react';
import IndexContent from '../components/index/IndexContent';
import AppLayout from '../components/layout/AppLayout';

const IndexPage = () => {
  return <IndexContent />;
};

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout title="Eztimate App">{page}</AppLayout>;
};

export default IndexPage;
