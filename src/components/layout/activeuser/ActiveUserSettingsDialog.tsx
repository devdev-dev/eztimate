import { Container, Dialog, DialogContent, Paper, Slide, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import SettingsLayout from '../SettingsLayout';

const CUSTOM_STACK_ID = 'customstack';

export interface EstimationSettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function ActiveUserSettingsDialog({ open, onClose }: EstimationSettingsDialogProps) {
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
            <Typography component="h2" variant="h5">
              Setting
            </Typography>
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