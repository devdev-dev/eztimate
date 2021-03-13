import { createStyles, Grid, makeStyles, Paper } from '@material-ui/core';
import Cookies from 'cookies';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import React from 'react';
import { useQuery } from 'react-fetching-library';
import Estimate from '../../components/app/Estimate';
import Sidebar from '../../components/app/Sidebar';
import withAppLayout from '../../components/withAppLayout';
import { FetchTeamAction } from '../../utils/mongodb/mongodb.actions';
import { CookieName } from '../../utils/types';

export const EstimationContext = React.createContext({ users: [] });

const Dashboard = () => {
  const classes = useStyles();

  const { loading, payload, error, query } = useQuery(FetchTeamAction);

  return (
    <EstimationContext.Provider value={{ users: payload }}>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12} sm={8} md={8}>
          <Estimate />
        </Grid>
        <Grid item xs={12} sm={4} md={3} component={Paper} elevation={6} square>
          <Sidebar />
        </Grid>
      </Grid>
    </EstimationContext.Provider>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: 'calc(100vh - 50px)'
    },
    image: {}
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
