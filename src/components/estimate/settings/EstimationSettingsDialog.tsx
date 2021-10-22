import { Container, Dialog, DialogContent, Paper, Slide, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import { useActiveIssueQuery } from '../../../generated/graphql';
import SettingsLayout from '../../layout/SettingsLayout';
import EstimationCardStackSelection from './EstimationCardStackSelection';
import EstimationInformation from './EstimationInformation';

export interface EstimationSettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function EstimationSettingsDialog({ open, onClose }: EstimationSettingsDialogProps) {
  const { data, loading, error } = useActiveIssueQuery();

  return (
    <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
      <SettingsLayout title="Estimation Settings" onClose={onClose}>
        <DialogContent>
          <Container component={Paper} maxWidth="md" sx={{ p: { xs: 2, md: 3 } }}>
            <Typography component="h2" variant="h5">
              Estimation Info
            </Typography>
            <EstimationInformation estimate={data?.getActiveIssue!} />
            <EstimationCardStackSelection stack={data?.getActiveIssue?.stack ?? []} />
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
