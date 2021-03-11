import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/client';
import React from 'react';
import IndexTabs from '../components/index/IndexTabs';
import withAppLayout from '../components/withAppLayout';
import { SessionUser } from '../utils/types';

interface IndexProps {
  teamId: string;
}

const Index: NextPage<IndexProps> = props => {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} md={7} />
      <Grid item xs={12} md={4} component={Paper} elevation={6} square>
        <IndexTabs teamId={props.teamId} />
      </Grid>
    </Grid>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  console.log("/serversideprops");
  const session = await getSession(context);
  if (session && (session.user as SessionUser).teamSession) {
    context.res.writeHead(302, { Location: '/app' });
    context.res.end();
    return { props: {} };
  }

  return { props: { teamId: (context.query?.join as string) ?? '' } };
};

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  image: {}
}));

export default withAppLayout(Index);
