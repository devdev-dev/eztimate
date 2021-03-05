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
  const handleClose = (create = false) => {
    props.onDialogClose();
    if (create) {
      fetch('/api/session/create')
        .then(response => console.log(`A nice response after create - ${response}`))
        .catch(error => console.error(`Something went wrong - ${error}`));
    }
  };

  return (
    <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create a new Session</DialogTitle>
      <DialogContent>
        <DialogContentText>To create a new session, please enter your username and a name for the new session and click `Create`.</DialogContentText>
        <TextField margin="dense" id="sessionname" label="Session Name" type="email" fullWidth />
        <TextField margin="dense" id="username" label="Username" type="email" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} color="secondary">
          Close
        </Button>
        <Button onClick={() => handleClose(true)} color="secondary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
