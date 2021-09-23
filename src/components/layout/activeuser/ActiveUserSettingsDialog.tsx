import { Alert, Container, Dialog, DialogContent, Paper, Slide, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import { usePusherChannel } from '../../AppContext';
import SettingsLayout from '../SettingsLayout';

export interface ActiveUserSettingsDialog {
  open: boolean;
  onClose: () => void;
}

export default function ActiveUserSettingsDialog({ open, onClose }: ActiveUserSettingsDialog) {
  const channel = usePusherChannel();

  const handleSave = () => {};

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => {
        onClose();
      }}
      TransitionComponent={Transition}
    >
      <SettingsLayout
        title="Active User Settings"
        onClose={() => {
          onClose();
        }}
        onSave={handleSave}
      >
        <DialogContent>
          <Container component={Paper} maxWidth="md" sx={{ p: { xs: 2, md: 3 } }}>
            <Alert severity="warning">
              You are not registered and your user and all settings are stored as a cookie in your browser. Register now to access your account from everywhere.
            </Alert>
            <Typography component="h2" variant="h5">
              User Info
            </Typography>
            <Typography>User ID: XXX</Typography>
            <Typography>User Name: Anonymous</Typography>
            <Typography>AVATAR:</Typography>
          </Container>
        </DialogContent>
      </SettingsLayout>
    </Dialog>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children?: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});