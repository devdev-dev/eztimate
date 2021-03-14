import { Avatar, Box, Button, CircularProgress, makeStyles, TextField, Typography } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { signIn, signOut, useSession } from 'next-auth/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import Copyright from './Copyright';

export default function SignInOut() {
  const [session] = useSession();
  return (
    <>
      {!session && <SignIn />}
      {session && <SignOut />}
      <Box mt={5}>
        <Copyright />
      </Box>
    </>
  );
}

function SignIn() {
  const classes = useStyles();
  const [_, loading] = useSession();

  const { register, handleSubmit } = useForm();
  const submitForm = data => {
    signIn('email', { redirect: true, email: data.email })
      .then(data => {
        console.log(JSON.stringify(data));
      })
      .catch(error => console.error(JSON.stringify(error)));
  };

  return (
    <>
      <Avatar className={classes.avatar}>
        <LockIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in to start estimating
      </Typography>
      <form onSubmit={handleSubmit(submitForm)} className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          inputRef={register}
          id="email"
          label="Email Address"
          name="email"
          type="email"
          inputProps={{
            autoComplete: 'on'
          }}
        />
        <div className={classes.buttonProgressWrapper}>
          <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading}>
            Sign In
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </form>
    </>
  );
}

function SignOut() {
  const classes = useStyles();
  const [_, loading] = useSession();

  const { handleSubmit } = useForm();
  const submitForm = _ => {
    signOut();
  };

  return (
    <>
      <Avatar className={classes.avatar}>
        <LockOpenIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign out
      </Typography>
      <form onSubmit={handleSubmit(submitForm)} className={classes.form}>
        <div className={classes.buttonProgressWrapper}>
          <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading}>
            Sign Out
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </form>
    </>
  );
}

const useStyles = makeStyles(theme => ({
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
