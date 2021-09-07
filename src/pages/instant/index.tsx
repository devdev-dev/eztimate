import { ApolloClient, InMemoryCache } from '@apollo/client';
import { PusherProvider, PusherProviderProps } from '@harelpls/use-pusher';
import Cookies from 'cookies';
import { GetServerSideProps, NextPage } from 'next';
import absoluteUrl from 'next-absolute-url/index';
import * as React from 'react';
import { AppContextProvider } from '../../components/AppContext';
import EstimationCardStack from '../../components/estimate/EstimationCardStack';
import EstimationResults from '../../components/estimate/EstimationResults';
import EstimationToolbar from '../../components/estimate/EstimationToolbar';
import { CookieName } from '../../cookies';
import {
  CreateActiveIssueDocument,
  CreateActiveIssueMutation,
  CreateUserDocument,
  CreateUserMutation,
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

const Instant: NextPage = () => {
  const { data, loading } = useActiveIssueQuery();

  return (
    <>
      {!loading && data && data.getActiveIssue && (
        <PusherProvider {...config}>
          <AppContextProvider issueId={data.getActiveIssue?._id}>
            <>
              <EstimationToolbar />
              <EstimationResults />
              <EstimationCardStack />
            </>
          </AppContextProvider>
        </PusherProvider>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
  const cookies = new Cookies(req, res);
  const apolloClient = new ApolloClient({
    uri: `${absoluteUrl(req).origin}/api/graphql`,
    cache: new InMemoryCache(),
    connectToDevTools: true
  });

  if (!cookies.get(CookieName.USER_ID)) {
    const { data } = await apolloClient.mutate<CreateUserMutation>({ mutation: CreateUserDocument });
    cookies.set(CookieName.USER_ID, data?.createUser?._id, { maxAge: 31536000000, httpOnly: false });
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

export default Instant;
