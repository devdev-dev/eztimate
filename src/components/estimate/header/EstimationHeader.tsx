import { Grid, Toolbar } from '@mui/material';
import * as React from 'react';
import EstimationHeaderIssueControl from './EstimationHeaderIssueControl';
import EstimationHeaderUserPanel from './EstimationHeaderUserPanel';

export default function EstimationHeader() {
  return (
    <Toolbar disableGutters>
      <Grid container direction="row" flexWrap={'wrap-reverse'} justifyContent="space-between" alignItems="center" component="section">
        <Grid item xs={12} sm md={5}>
          <EstimationHeaderIssueControl />
        </Grid>
        <Grid item xs={12} sm="auto" md>
          <EstimationHeaderUserPanel />
        </Grid>
      </Grid>
    </Toolbar>
  );
}
