import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'cookies';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/client';
import React from 'react';
import IndexTabs from '../components/index/IndexTabs';
import withAppLayout from '../components/withAppLayout';
import { CookieName } from '../utils/types';

interface IndexProps {
  teamId: string;
}

const Index: NextPage<IndexProps> = props => {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={6} lg={7} />
      <Grid item xs={12} sm={8} md={6} lg={4} component={Paper} elevation={6} square>
        <IndexTabs teamId={props.teamId} />
      </Grid>
    </Grid>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);
  const cookies = new Cookies(context.req, context.res);

  if (session && cookies.get(CookieName.TEAM_ID)) {
    context.res.writeHead(302, { Location: '/app' });
    context.res.end();
    return { props: {} };
  }

  return { props: { teamId: (context.query?.join as string) ?? '' } };
};

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    backgroundColor: theme.palette.grey[100]
  }
}));

export default withAppLayout(Index);
