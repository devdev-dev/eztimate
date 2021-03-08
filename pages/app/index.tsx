import { createStyles, Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import Estimate from '../../components/app/Estimate';
import Sidebar from '../../components/app/Sidebar';
import withAppLayout from '../../components/withAppLayout';
import withTeamId from '../../components/withTeamId';

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

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: 'calc(100vh - 50px)'
    },
    image: {}
  })
);

export default withAppLayout(withTeamId(Dashboard));
