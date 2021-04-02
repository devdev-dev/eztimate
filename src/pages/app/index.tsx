import { PusherProvider, PusherProviderProps } from '@harelpls/use-pusher';
import { createStyles, Grid, makeStyles, Paper } from '@material-ui/core';
import Cookies from 'cookies';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import React from 'react';
import Estimate from '../../components/app/estimate';
import Sidebar from '../../components/app/timeline';
import withAppLayout from '../../components/withAppLayout';
import { CookieName } from '../../utils/types';

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
  teamId: string;
}
export const AppContext = React.createContext({} as IContextProps);

const Dashboard = ({ teamId }) => {
  const classes = useStyles();
  return (
    <PusherProvider {...config}>
      <AppContext.Provider value={{ teamId }}>
        <Grid container component="main" className={classes.root}>
          <Grid item sm={12} md={8} lg={8} className={classes.parts}>
            <Estimate />
          </Grid>
          <Grid item sm={12} md={4} lg={3} className={classes.parts} component={Paper} elevation={6} square>
            <Sidebar />
          </Grid>
        </Grid>
      </AppContext.Provider>
    </PusherProvider>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: 'calc(100vh - 63px)',
      overflow: 'hidden'
    },
    parts: { height: '100%' }
  })
);

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);
  const cookies = new Cookies(context.req, context.res);

  if (!session || !cookies.get(CookieName.TEAM_ID)) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end();
    return { props: {} };
  }
  return { props: { teamId: cookies.get(CookieName.TEAM_ID) } };
};

export default withAppLayout(Dashboard);
