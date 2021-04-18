import { IconButton, Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import React, { useRef, useState } from 'react';
import { useLoggedInUserQuery, useUserUpdateMutation } from '../apollo/types.grapqhl';
import UploadAvatar from './UploadAvatar';

export interface ProfileDialogProps {
  open: boolean;
  onDialogClose: () => void;
}

export default function ProfileDialog({ open, onDialogClose }: ProfileDialogProps) {
  const classes = useStyles();

  const { data: loggedInUser } = useLoggedInUserQuery();
  const [userUpdate] = useUserUpdateMutation({ ignoreResults: true });

  const emailFieldRef = useRef<HTMLInputElement>(null);
  const [emailFieldHelperText, setEmailFieldHelperText] = useState('');

  const usernameFieldRef = useRef<HTMLInputElement>(null);

  const editorRef = useRef(null);

  const handleClose = () => {
    setEmailFieldHelperText('');
    onDialogClose();
  };

  const handleSave = () => {
    const email = emailFieldRef.current?.value;
    if (!email || !validateEmail(email)) {
      setEmailFieldHelperText('The given email is invalid');
      return;
    }

    const username = usernameFieldRef.current?.value ?? null;
    const avatar = editorRef?.current?.getImageScaledToCanvas().toDataURL();

    userUpdate({ variables: { id: loggedInUser?.loggedInUser?._id, email, username, avatar } }).then(() => handleClose());
  };

  return (
    <div>
      <Dialog onClose={onDialogClose} open={open}>
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
          <Typography variant="caption">The information below are visible for others</Typography>
          <TextField
            margin="dense"
            fullWidth
            label="Email Address"
            inputRef={emailFieldRef}
            helperText={emailFieldHelperText}
            error={emailFieldHelperText.length > 0}
            defaultValue={loggedInUser?.loggedInUser.email ?? ''}
            variant="outlined"
            required
          />
          <TextField
            margin="dense"
            fullWidth
            label="Username"
            inputRef={usernameFieldRef}
            defaultValue={loggedInUser?.loggedInUser.username ?? ''}
            variant="outlined"
          />
          <Typography variant="h6">Customize your personal avatar</Typography>
          <Typography variant="caption">Use drag and drop to adjust the image crop. Maximum file size is 420kB.</Typography>
          <UploadAvatar editorRef={editorRef} imageDataUrl={loggedInUser?.loggedInUser?.avatar} />
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

function validateEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
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
