import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';

export type AppSnackbarProps = {
  message: string;
  icon: React.ReactNode;
  open: boolean;
  onClose: () => void;
};

const AppSnackbar = ({ message, icon, open, onClose }: AppSnackbarProps) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={open}
      message={message}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity="info" variant="filled" icon={icon}>
        Invitation link copied. Share it with your team!
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
