import Paper from '@material-ui/core/Paper';
import * as React from 'react';

const Estimate = () => {
  return (
    <>
      <Paper
        sx={{
          mb: 4,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 240
        }}
      >
        Estimation Game
      </Paper>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        Cards
      </Paper>
    </>
  );
};

export default Estimate;
