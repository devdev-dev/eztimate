import { ApolloClient, InMemoryCache } from '@apollo/client';
import { PusherProvider, PusherProviderProps } from '@harelpls/use-pusher';
import { Paper } from '@mui/material';
import Cookies from 'cookies';
import { GetServerSideProps } from 'next';
import absoluteUrl from 'next-absolute-url/index';
import * as React from 'react';
import { ReactElement } from 'react';
import { AppContextProvider } from '../../components/AppContext';
import EstimationBody from '../../components/estimate/body/EstimationBody';
import EstimationCardStack from '../../components/estimate/EstimationCardStack';
import EstimationMenu from '../../components/estimate/EstimationMenu';
import EstimationResults from '../../components/estimate/EstimationResults';
import EstimationHeader from '../../components/estimate/header/EstimationHeader';
import AppLayout from '../../components/layout/AppLayout';
import NotificationSnackbar from '../../components/NotificationSnackbar';
import { CookieName } from '../../cookies';
import {
  CreateActiveIssueDocument,
  CreateActiveIssueMutation,
  CreateActiveUserDocument,
  CreateActiveUserMutation,
  useActiveIssueQuery,
  ValidateIssueDocument,
  ValidateIssueQuery
} from '../../generated/graphql';

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

const InstantPage = () => {
  const { data, loading } = useActiveIssueQuery();

  return (
    <PusherProvider {...config}>
      {!loading && data && data.getActiveIssue && (
        <AppContextProvider issueId={data.getActiveIssue?._id}>
          <>
            <EstimationHeader />
            <EstimationBody />
            <EstimationMenu />
            <NotificationSnackbar />
          </>
        </AppContextProvider>
      )}
    </PusherProvider>
  );
};

InstantPage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout title="Quick Estimate">{page}</AppLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
  const cookies = new Cookies(req, res);
  const apolloClient = new ApolloClient({
    uri: `${absoluteUrl(req).origin}/api/graphql`,
    cache: new InMemoryCache(),
    connectToDevTools: true
  });

  if (!cookies.get(CookieName.USER_ID)) {
    const { data } = await apolloClient.mutate<CreateActiveUserMutation>({ mutation: CreateActiveUserDocument });
    cookies.set(CookieName.USER_ID, data?.createActiveUser?._id, { maxAge: 31536000000, httpOnly: false });
  }

  if (query.join) {
    const { data } = await apolloClient.query<ValidateIssueQuery>({
      query: ValidateIssueDocument,
      variables: { id: query.join }
    });
    if (data && data.validateIssue) {
      cookies.set(CookieName.ISSUE_ID, query.join.toString(), { maxAge: 31536000000, httpOnly: false });
    } else {
      const { data } = await apolloClient.mutate<CreateActiveIssueMutation>({ mutation: CreateActiveIssueDocument });
      cookies.set(CookieName.ISSUE_ID, data?.createActiveIssue?._id, { maxAge: 31536000000, httpOnly: false });
    }
  } else if (!cookies.get(CookieName.ISSUE_ID)) {
    const { data } = await apolloClient.mutate<CreateActiveIssueMutation>({ mutation: CreateActiveIssueDocument });
    cookies.set(CookieName.ISSUE_ID, data?.createActiveIssue?._id, { maxAge: 31536000000, httpOnly: false });
  }

  return { props: {} };
};

export default InstantPage;
