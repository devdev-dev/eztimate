import { PusherProvider, PusherProviderProps } from '@harelpls/use-pusher';
import Cookies from 'cookies';
import { randomUUID } from 'crypto';
import { GetServerSideProps, NextPage } from 'next';
import * as React from 'react';
import AppLayout from '../../src/AppLayout';
import Copyright from '../../src/components/Copyright';
import Estimate from '../../src/components/estimate/Estimate';
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

interface IContextProps {
  estimateId: string;
}

export const AppContext = React.createContext({} as IContextProps);

interface InstantEstimateProps {
  estimateId: string;
}

const InstantEstimate: NextPage<InstantEstimateProps> = ({ estimateId }) => {
  return (
    <PusherProvider {...config}>
      <AppContext.Provider value={{ estimateId }}>
        <AppLayout>
          <Estimate />
          <Copyright sx={{ pt: 4 }} />
        </AppLayout>
      </AppContext.Provider>
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
