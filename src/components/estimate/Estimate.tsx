import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import * as React from 'react';
import CardStack from './CardStack';
import EstimationPanel from './EstimationPanel';

const Estimate = () => {
  return (
    <>
      <Paper
        sx={{
          mb: 4,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <EstimationPanel />
      </Paper>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <CardStack />
      </Paper>
    </>
  );
};

export default Estimate;
