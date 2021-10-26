import { ApolloClient, InMemoryCache } from '@apollo/client';
import { PusherProvider, PusherProviderProps } from '@harelpls/use-pusher';
import Cookies from 'cookies';
import { GetServerSideProps } from 'next';
import absoluteUrl from 'next-absolute-url/index';
import * as React from 'react';
import { ReactElement } from 'react';
import { AppContextProvider } from '../../components/AppContext';
import EstimationBody from '../../components/estimate/body/EstimationBody';
import EstimationMenu from '../../components/estimate/EstimationMenu';
import EstimationHeader from '../../components/estimate/header/EstimationHeader';
import AppLayout from '../../components/layout/AppLayout';
import NotificationSnackbar from '../../components/NotificationSnackbar';
import { CookieName } from '../../cookies';
import {
  CreateActiveIssueDocument,
  CreateActiveIssueMutation,
  CreateActiveUserDocument,
  CreateActiveUserMutation,
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

const InstantPage = ({ issueId }: { issueId: string }) => {
  return (
    <PusherProvider {...config}>
      <AppContextProvider issueId={issueId}>
        <>
          <EstimationHeader />
          <EstimationBody />
          <EstimationMenu />
          <NotificationSnackbar />
        </>
      </AppContextProvider>
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

  let userId = cookies.get(CookieName.USER_ID);
  let issueId = cookies.get(CookieName.ISSUE_ID);

  if (query.join) {
    const { data } = await apolloClient.query<ValidateIssueQuery>({
      query: ValidateIssueDocument,
      variables: { id: query.join }
    });
    issueId = data?.validateIssue?._id;
    createIssueIdCookie(cookies, CookieName.ISSUE_ID, issueId ?? '');
  }

  if (!issueId) {
    const { data } = await apolloClient.mutate<CreateActiveIssueMutation>({ mutation: CreateActiveIssueDocument });
    issueId = data?.createActiveIssue?._id;
    createIssueIdCookie(cookies, CookieName.ISSUE_ID, issueId ?? '');
  }

  if (!userId) {
    const { data } = await apolloClient.mutate<CreateActiveUserMutation>({ mutation: CreateActiveUserDocument });
    userId = data?.createActiveUser?._id;
    createIssueIdCookie(cookies, CookieName.USER_ID, userId ?? '');
  }

  return { props: { issueId } };
};

function createIssueIdCookie(cookies: Cookies, name: CookieName, value: string) {
  cookies.set(name, value, { maxAge: 31536000000, httpOnly: false });
}

export default InstantPage;
