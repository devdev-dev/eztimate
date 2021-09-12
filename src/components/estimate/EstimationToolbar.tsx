import { Grid, Toolbar } from '@mui/material';
import * as React from 'react';
import EstimationToolbarIssueControl from './EstimationToolbarIssueControl';
import EstimationToolbarUserPanel from './EstimationToolbarUserPanel';

export default function EstimationToolbar() {
  return (
    <Toolbar disableGutters>
      <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" component="section">
        <Grid item>
          <EstimationToolbarIssueControl />
        </Grid>
      </Grid>
      <EstimationToolbarUserPanel />
    </Toolbar>
  );
}