import { Paper } from '@mui/material';
import * as React from 'react';
import EstimationCardStack from '../EstimationCardStack';
import EstimationResults from '../EstimationResults';

export default function EstimationBody() {
  return (
    <Paper sx={{ mt: 1, p: 2 }}>
      <EstimationResults />
      <EstimationCardStack />
    </Paper>
  );
}
