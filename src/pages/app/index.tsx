import { createStyles, Grid, makeStyles, Paper } from '@material-ui/core';
import Cookies from 'cookies';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import React from 'react';
import { useQuery } from 'react-query';
import Estimate from '../../components/app/Estimate';
import Sidebar from '../../components/app/Sidebar';
import withAppLayout from '../../components/withAppLayout';
import { queryTeamAction, queryUsersAction } from '../../utils/mongodb/mongodb.actions';
import { CookieName, UApp, UTeam, UUser } from '../../utils/types';

export const AppContext = React.createContext<UApp>(undefined);

const Dashboard = () => {
  const classes = useStyles();

  const teamQuery = useQuery<UTeam[]>('team', queryTeamAction);
  const usersQuery = useQuery<UUser[]>('users', queryUsersAction);

  return (
    <AppContext.Provider value={{ team: teamQuery.data ? teamQuery.data[0] : undefined, users: usersQuery.data }}>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12} sm={8} lg={8} className={classes.parts}>
          <Estimate />
        </Grid>
        <Grid item xs={12} sm={4} lg={3} className={classes.parts} component={Paper} elevation={6} square>
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
