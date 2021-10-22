import { Grid, Paper, Toolbar } from '@mui/material';
import * as React from 'react';
import EstimationCardStack from '../EstimationCardStack';
import EstimationResults from '../EstimationResults';

export default function EstimationBody() {
  return (
    <Paper sx={{ mt: 2, p: 2 }}>
      <EstimationResults />
      <EstimationCardStack />
    </Paper>
  );
}
