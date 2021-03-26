import { useEvent, usePresenceChannel, useTrigger } from '@harelpls/use-pusher';
import { createStyles, Grid, makeStyles, Paper } from '@material-ui/core';
import Cookies from 'cookies';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import React, { useState } from 'react';
import Estimate from '../../components/app/estimate';
import Sidebar from '../../components/app/timeline';
import withAppLayout from '../../components/withAppLayout';
import { CookieName } from '../../utils/types';

export const AppContext = React.createContext(undefined);

const Dashboard = () => {
  const classes = useStyles();

  const [message, setMessages] = useState<string>('');
  const { channel } = usePresenceChannel('presence-awesome');
  useEvent(channel, 'testevent', event => {
    console.log(event);
    console.log(channel);
    setMessages('Miau');
  });

  const trigger = useTrigger('presence-awesome');
  const handleCLick = () => {
    console.log('trigger');
    trigger('testevent', 'hello');
  };

  return (
    <AppContext.Provider value={{}}>
      <button onClick={handleCLick}>TEXT</button>
      {message}
      <Grid container component="main" className={classes.root}>
        <Grid item sm={12} md={8} lg={8} className={classes.parts}>
          <Estimate />
        </Grid>
        <Grid item sm={12} md={4} lg={3} className={classes.parts} component={Paper} elevation={6} square>
          <Sidebar />
        </Grid>
      </Grid>
    </AppContext.Provider>
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
  return { props: {} };
};

export default withAppLayout(Dashboard);
