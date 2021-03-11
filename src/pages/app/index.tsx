import { createStyles, Grid, makeStyles, Paper } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import React from 'react';
import Estimate from '../../components/app/Estimate';
import Sidebar from '../../components/app/Sidebar';
import withAppLayout from '../../components/withAppLayout';
import { SessionUser } from '../../utils/types';

const Dashboard = ({ user }) => {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={8} md={8}>
        <Estimate />
      </Grid>
      <Grid item xs={12} sm={4} md={3} component={Paper} elevation={6} square>
        <Sidebar />
      </Grid>
    </Grid>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);
  if (!session || !(session.user as SessionUser).teamSession) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end();
    return { props: {} };
  }
  return { props: { user: session.user } };
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: 'calc(100vh - 50px)'
    },
    image: {}
  })
);

export default withAppLayout(Dashboard);
