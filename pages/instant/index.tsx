import Cookies from 'cookies';
import { randomUUID } from 'crypto';
import { GetServerSideProps } from 'next';
import * as React from 'react';
import AppLayout from '../../src/AppLayout';
import Copyright from '../../src/components/Copyright';
import Estimate from '../../src/components/estimate/Estimate';
import { CookieName } from '../../src/cookies';

export default function InstantEstimate() {
  return (
    <AppLayout>
      <Estimate />
      <Copyright sx={{ pt: 4 }} />
    </AppLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
  const cookies = new Cookies(req, res);

  if (!cookies.get(CookieName.USER_ID)) {
    cookies.set(CookieName.USER_ID, randomUUID());
  }

  const estimateId = query.id;
  if (estimateId) {
    cookies.set(CookieName.ESTIMATE_ID, estimateId.toString());
  } else {
    res.writeHead(302, { Location: '/' });
    res.end();
    return { props: {} };
  }

  return { props: {} };
};
