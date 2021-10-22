import { Alert, Box, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import { Estimate, User, useUpdateActiveUserMutation } from '../../../generated/graphql';

export interface EstimationInformationProps {
  estimate: Pick<Estimate, '_id'>;
}

export default function EstimationInformation({ estimate }: EstimationInformationProps) {
  return (
    <Box sx={{ p: 1, display: 'flex', gap: 2, flexDirection: 'column' }}>
      <Alert severity="warning">This is an instant estimation session which is public. All settings are temporary and can be changed by anyone.</Alert>
      <TextField label="Your id" variant="outlined" value={estimate._id} fullWidth disabled />
    </Box>
  );
}
