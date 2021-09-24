import { Alert, Chip, Container, Dialog, DialogContent, Divider, Grid, Paper, Slide, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import { useActiveUserQuery } from '../../../generated/graphql';
import SettingsLayout from '../SettingsLayout';
import UploadAvatar from './UploadAvatar';

export interface ActiveUserSettingsDialog {
  open: boolean;
  onClose: () => void;
}

export default function ActiveUserSettingsDialog({ open, onClose }: ActiveUserSettingsDialog) {
  const { data, loading, error } = useActiveUserQuery();

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
            <Typography component="h2" variant="h5" gutterBottom>
              User Info
            </Typography>

            {!data?.getActiveUser?.email && (
              <Alert severity="warning">
                You are not registered and your user and all settings are stored as a cookie in your browser. Register now to access your account from
                everywhere.
              </Alert>
            )}

            <Divider sx={{ my: 2 }}>
              <Chip label="Profile Settings" />
            </Divider>

            <Grid container>
              <Grid item xs={12} sm="auto">
                <UploadAvatar />
              </Grid>
              <Grid item xs={12} sm>
                <Typography>User ID: {data?.getActiveUser?._id}</Typography>
                <Typography>User Name: {data?.getActiveUser?.name}</Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }}>
              <Chip label="Notification Settings" />
            </Divider>
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