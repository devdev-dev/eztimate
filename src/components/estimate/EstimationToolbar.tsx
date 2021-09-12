import { Grid, Toolbar } from '@mui/material';
import * as React from 'react';
import EstimationToolbarIssueControl from './EstimationToolbarIssueControl';
import EstimationToolbarUserPanel from './EstimationToolbarUserPanel';

export default function EstimationToolbar() {
  return (
    <Toolbar disableGutters>
      <Grid container direction="row" flexWrap={'wrap-reverse'} justifyContent="space-between" alignItems="center" component="section">
        <Grid item xs={12} sm md={5}>
          <EstimationToolbarIssueControl />
        </Grid>
        <Grid item xs={12} sm="auto" md>
          <EstimationToolbarUserPanel />
        </Grid>
      </Grid>
    </Toolbar>
  );
}