import { Grid } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { NextPage, NextPageContext } from 'next';
import React from 'react';
import IndexTabs from '../components/index/IndexTabs';
import withAppLayout from '../components/withAppLayout';

interface IndexProps {
  sessionId: string;
}

const Index: NextPage<IndexProps> = props => {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <IndexTabs sessionId={props.sessionId} />
      </Grid>
    </Grid>
  );
};

Index.getInitialProps = async (context: NextPageContext) => {
  return { sessionId: (context.query?.join as string) ?? undefined };
};

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
}));

export default withAppLayout(Index);
