import { IconButton, Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import React from 'react';
import UploadAvatar from './UploadAvatar';
export interface ProfileDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function ProfileDialog({ open, onClose }: ProfileDialogProps) {
  const classes = useStyles();

  return (
    <div>
      <Dialog onClose={onClose} open={open}>
        <DialogTitle disableTypography className={classes.title}>
          <Typography variant="h6" className={classes.titleText}>
            Edit your Profile
          </Typography>
          <Tooltip title="Download your data">
            <IconButton>
              <CloudDownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete you profile">
            <IconButton>
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6">Update your profile information</Typography>
          <TextField margin="dense" fullWidth label="Email Address" helperText="Your email is required to login." variant="outlined" required />
          <TextField margin="dense" fullWidth label="Username" helperText="Setup a username that is shown to your team." variant="outlined" />
          <Typography variant="h6">Customize your personal avatar</Typography>
          <UploadAvatar />
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" autoFocus onClick={onClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      margin: 0,
      padding: theme.spacing(2),
      display: 'flex',
      alignItems: 'center'
    },
    titleText: { flexGrow: 1 }
  })
);
