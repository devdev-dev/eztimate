import { Avatar, IconButton, makeStyles, TextField, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { useMutation } from 'react-query';
import { JoinTeamMutation } from '../../../utils/mongodb/mongodb.actions';
import { CookieName } from '../../../utils/types';

export interface JoinSessionProps {
  teamId: string;
}

export default function JoinNewTeam(props: JoinSessionProps) {
  const classes = useStyles();
  const router = useRouter();

  const joinTeamMutation = useMutation(JoinTeamMutation, {
    onSuccess: data => {
      Cookies.set(CookieName.TEAM_ID, data);
      router.push('/app');
    }
  });

  const textFieldRef = useRef<HTMLInputElement>(null);
  const handleJoinTeam = () => {
    joinTeamMutation.mutate({
      teamId: textFieldRef.current?.value
    });
  };

  return (
    <>
      <Avatar className={classes.avatar}>
        <GroupAddIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Join your team
      </Typography>

      <TextField
        className={classes.joinTeamInput}
        size="small"
        margin="normal"
        id="joinTeam"
        variant="outlined"
        placeholder="Join a new team (ID)"
        fullWidth={true}
        inputRef={textFieldRef}
        autoComplete="off"
        defaultValue={props.teamId}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleJoinTeam}>
              <ArrowForwardIosIcon />
            </IconButton>
          )
        }}
      />
    </>
  );
}

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  joinTeamInput: {
    '& .MuiOutlinedInput-adornedEnd': {
      paddingRight: 0
    }
  }
}));
