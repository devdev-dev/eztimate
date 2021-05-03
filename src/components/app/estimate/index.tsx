import { Container, createStyles, makeStyles } from '@material-ui/core';
import React from 'react';
import EstimationPanel from './EstimationPanel';
import UserPanel from './EstimationToolbar';

const Estimate = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <UserPanel />
      <EstimationPanel />
    </Container>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    container: {}
  })
);

export default Estimate;
