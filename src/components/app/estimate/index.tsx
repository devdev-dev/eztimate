import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import EstimationPanel from './EstimationPanel';
import IssuePanel from './IssuePanel';
import UserPanel from './UserPanel';

const Estimate = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <UserPanel />
      <IssuePanel />
      <EstimationPanel />
    </Container>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {}
  })
);

export default Estimate;
