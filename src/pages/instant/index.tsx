import { ApolloClient, InMemoryCache } from '@apollo/client';
import { PusherProvider, PusherProviderProps } from '@harelpls/use-pusher';
import BoltIcon from '@mui/icons-material/Bolt';
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Box, Container, IconButton, Paper, styled, Toolbar, Typography } from '@mui/material';
import Cookies from 'cookies';
import { GetServerSideProps, NextPage } from 'next';
import absoluteUrl from 'next-absolute-url/index';
import * as React from 'react';
import { AppContextProvider } from '../../components/AppContext';
import EstimationCardStack from '../../components/estimate/EstimationCardStack';
import EstimationResults from '../../components/estimate/EstimationResults';
import EstimationToolbar from '../../components/estimate/EstimationToolbar';
import NotificationSnackbar from '../../components/NotificationSnackbar';
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

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 128
  }
}));

const Instant: NextPage = () => {
  const { data, loading } = useActiveIssueQuery();

  return (
    <Box
      sx={{
        bgcolor: '#dee9f3',
        height: '100vh',
        width: '100%'
      }}
    >
      <AppBar position="relative" color="transparent" variant="outlined" elevation={0} sx={{ bgcolor: 'white' }}>
        <StyledToolbar>
          <Box>
            <IconButton color="inherit">
              <HomeIcon />
            </IconButton>
            <IconButton color="inherit">
              <BoltIcon />
            </IconButton>
          </Box>
        </StyledToolbar>
      </AppBar>

      <Container maxWidth="lg">
        <PusherProvider {...config}>
          {!loading && data && data.getActiveIssue && (
            <AppContextProvider issueId={data.getActiveIssue?._id}>
              <>
                <Typography variant={'h4'} sx={{ py: 4 }}>
                  Quick Estimate
                </Typography>
                <EstimationToolbar />
                <Paper sx={{ mt: 2, p: 2 }}>
                  <EstimationResults />
                  <EstimationCardStack />
                </Paper>
                <NotificationSnackbar />
              </>
            </AppContextProvider>
          )}
        </PusherProvider>
      </Container>
    </Box>
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
