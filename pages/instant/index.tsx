import { PusherProvider, PusherProviderProps } from '@harelpls/use-pusher';
import Cookies from 'cookies';
import { randomUUID } from 'crypto';
import { GetServerSideProps, NextPage } from 'next';
import * as React from 'react';
import { AppContextProvider } from '../../src/components/AppContext';
import EstimationCardStack from '../../src/components/estimate/EstimationCardStack';
import EstimationResults from '../../src/components/estimate/EstimationResults';
import EstimationToolbar from '../../src/components/estimate/EstimationToolbar';
import { CookieName } from '../../src/cookies';

const config: PusherProviderProps = {
  clientKey: process.env.NEXT_PUBLIC_PUSHER_KEY,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  authEndpoint: '/api/pusher/auth',
  triggerEndpoint: '/api/pusher',
  forceTLS: true,
  auth: {
    headers: { Authorization: 'Bearer token' }
  }
};

interface InstantEstimateProps {
  estimateId: string;
}

const InstantEstimate: NextPage<InstantEstimateProps> = ({ estimateId }) => {
  return (
    <PusherProvider {...config}>
      <AppContextProvider estimateId={estimateId}>
        <>
          <EstimationToolbar />
          <EstimationResults />
          <EstimationCardStack />
        </>
      </AppContextProvider>
    </PusherProvider>
  );
};

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
  return { props: { estimateId } };
};

export default InstantEstimate;
