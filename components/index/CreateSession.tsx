import { Avatar, Box, Button, CircularProgress, makeStyles, TextField, Typography } from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';
import React from 'react';
import { Action, useMutation } from 'react-fetching-library';
import { useForm } from 'react-hook-form';
import Copyright from './Copyright';

const createSessionAction = data =>
  ({
    method: 'POST',
    endpoint: '/api/session/create',
    body: data
  } as Action);

export default function CreateSession() {
  const classes = useStyles();
  const { loading, mutate, error } = useMutation(createSessionAction);

  if (error) {
    // TODO
  }

  const { register, handleSubmit } = useForm();
  const submitForm = data => {
    console.log(data);
    mutate({
      sessionName: data.session_name
    });
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LaunchIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Start Estimation
      </Typography>
      <form onSubmit={handleSubmit(submitForm)} className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          inputRef={register}
          id="session_name"
          label="Name of your estimation session"
          name="session_name"
          autoFocus
        />
        <div className={classes.buttonProgressWrapper}>
          <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading}>
            Create
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
