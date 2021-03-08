import { createStyles, Grid, makeStyles, Paper, Theme } from '@material-ui/core';
import React from 'react';
import Estimate from '../../components/app/Estimate';
import Sidebar from '../../components/app/Sidebar';
import withAppLayout from '../../components/withAppLayout';

const Dashboard = () => {
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh'
    },
    image: {}
  })
);

export default withAppLayout(Dashboard);
