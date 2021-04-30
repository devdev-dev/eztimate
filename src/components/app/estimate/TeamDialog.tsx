import { Divider, IconButton, TextField, Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import React, { useRef } from 'react';
import { useGetActiveTeamQuery } from '../../../apollo/types.grapqhl';

export interface TeamDialogProps {
  onDialogClose: () => void;
}

export default function TeamDialog({ onDialogClose }: TeamDialogProps) {
  const classes = useStyles();

  const { data, loading } = useGetActiveTeamQuery();

  const usernameFieldRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    onDialogClose();
  };

  const handleSave = async () => {};

  return (
    <div>
      <Dialog onClose={onDialogClose} open={true} fullWidth={true} maxWidth="sm">
        <DialogTitle disableTypography className={classes.title}>
          <Typography variant="h6" className={classes.titleText}>
            Team Settings
          </Typography>
          <Tooltip title="Delete this team">
            <IconButton>
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6">Team Information</Typography>
          <TextField margin="dense" fullWidth label="Name" inputRef={usernameFieldRef} defaultValue={data.activeTeam.name} variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" autoFocus onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      display: 'flex',
      alignItems: 'center'
    },
    titleText: { flexGrow: 1 }
  })
);
