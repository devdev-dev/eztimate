import { Avatar, Button, CircularProgress, makeStyles, TextField, Typography } from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation } from 'react-fetching-library';
import { useForm } from 'react-hook-form';
import { JoinTeamAction } from '../../../utils/mongodb/mongodb.actions';
import { CookieName } from '../../../utils/types';

export interface JoinSessionProps {
  teamId: string;
}

export default function JoinNewTeam(props: JoinSessionProps) {
  const classes = useStyles();
  const router = useRouter();
  const { loading, mutate } = useMutation(JoinTeamAction);

  const { register, handleSubmit } = useForm();
  const submitForm = data => {
    mutate({
      teamId: data.teamId
    })
      .then(result => {
        Cookies.set(CookieName.TEAM_ID, result.payload.teamId);
        router.push('/app');
      })
      .catch(error => console.error(error));
  };

  return (
    <>
      <Avatar className={classes.avatar}>
        <GroupAddIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Join your team
      </Typography>
      <form onSubmit={handleSubmit(submitForm)} className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          inputRef={register}
          id="teamId"
          label="Team ID"
          name="teamId"
          defaultValue={props.teamId}
        />
        <div className={classes.buttonProgressWrapper}>
          <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading}>
            Join
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
