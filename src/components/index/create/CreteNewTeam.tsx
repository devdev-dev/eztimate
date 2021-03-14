import { Avatar, Box, Button, CircularProgress, makeStyles, TextField, Typography } from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { CreateTeamMutation } from '../../../utils/mongodb/mongodb.actions';
import { CookieName } from '../../../utils/types';
import Copyright from '../Copyright';

export default function CreateNewTeam() {
  const classes = useStyles();
  const router = useRouter();

  const createTeamMutation = useMutation(CreateTeamMutation, {
    onSuccess: data => {
      console.log(data);
      Cookies.set(CookieName.TEAM_ID, data);
      router.push('/app');
    }
  });

  const { register, handleSubmit } = useForm();
  const submitForm = data => {
    createTeamMutation.mutate({
      teamName: data.teamName
    });
  };

  return (
    <>
      <Avatar className={classes.avatar}>
        <LaunchIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create a new team
      </Typography>
      <form onSubmit={handleSubmit(submitForm)} className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          inputRef={register}
          id="teamName"
          label="Team Name"
          name="teamName"
          inputProps={{
            autoComplete: 'off'
          }}
        />
        <div className={classes.buttonProgressWrapper}>
          <Button type="submit" fullWidth variant="contained" color="primary" disabled={createTeamMutation.isLoading}>
            Create
          </Button>
          {createTeamMutation.isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </form>
      <Box mt={5}>
        <Copyright />
      </Box>
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
