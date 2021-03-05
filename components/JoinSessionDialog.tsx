import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React from 'react';

type DialogProps = {
  open: boolean;
  onDialogClose: () => void;
};

export default function CreateSessionDialog(props: DialogProps) {
  const handleClose = (join = false) => {
    props.onDialogClose();
    if (join) {
      fetch('/api/session/join')
        .then(response => console.log(`A nice response after join - ${response}`))
        .catch(error => console.error(`Something went wrong - ${error}`));
    }
  };

  return (
    <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Join an existing Session</DialogTitle>
      <DialogContent>
        <DialogContentText>To join a existing session, please enter the session id and a your username and click `Join`.</DialogContentText>
        <TextField margin="dense" id="sessionid" label="Session ID" type="email" fullWidth />
        <TextField margin="dense" id="username" label="Username" type="email" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} color="secondary">
          Close
        </Button>
        <Button onClick={() => handleClose(true)} color="primary">
          Join
        </Button>
      </DialogActions>
    </Dialog>
  );
}
