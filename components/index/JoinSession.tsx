import { CircularProgress } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import React from 'react';
import { Action, useMutation } from 'react-fetching-library';
import { useForm } from 'react-hook-form';
import Copyright from './Copyright';

const joinSessionAction = data =>
  ({
    method: 'POST',
    endpoint: '/api/session/join',
    body: data
  } as Action);

export default function JoinSession() {
  const classes = useStyles();
  const { loading, mutate, error } = useMutation(joinSessionAction);

  if (error) {
    // TODO
  }

  const { register, handleSubmit } = useForm();
  const submitForm = data => {
    mutate({
      sessionId: data.session_id
    });
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <GroupAddIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Join your team
      </Typography>
      <form onSubmit={handleSubmit(submitForm)} className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          inputRef={register}
          id="session_id"
          label="Session ID to Join"
          name="session_id"
          autoFocus
        />
        <div className={classes.buttonProgressWrapper}>
          <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading}>
            Join
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </form>
      <Box mt={5}>
        <Copyright />
      </Box>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  buttonProgressWrapper: {
    margin: theme.spacing(3, 0, 2),
    position: 'relative',
    width: '100%'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}));
