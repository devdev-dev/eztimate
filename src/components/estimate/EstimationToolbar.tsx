import { Toolbar } from '@mui/material';
import * as React from 'react';
import EstimationSettingsDialogButton from './EstimationSettingsDialogButton';
import EstimationToolbarIssueControl from './EstimationToolbarIssueControl';
import EstimationToolbarUserPanel from './EstimationToolbarUserPanel';

export default function EstimationToolbar() {
  return (
    <Toolbar disableGutters>
      <EstimationSettingsDialogButton />
      <EstimationToolbarIssueControl />
      <EstimationToolbarUserPanel />
    </Toolbar>
  );
}