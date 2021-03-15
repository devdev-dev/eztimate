import { Avatar, IconButton, makeStyles, TextField, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { gql, request } from 'graphql-request';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { CookieName } from '../../../utils/types';

export interface JoinSessionProps {
  teamId: string;
}

export default function JoinNewTeam(props: JoinSessionProps) {
  const classes = useStyles();
  const router = useRouter();

  const mutation = gql`
    mutation AddUserToTeam($teamId: String!) {
      userAddTeam(teamId: $teamId) {
        _id
      }
    }
  `;

  const textFieldRef = useRef<HTMLInputElement>(null);
  const handleJoinTeam = () => {
    request('/api/graphql', mutation, { teamId: textFieldRef.current?.value }).then(data => {
      console.log(data.userAddTeam._id);
      Cookies.set(CookieName.TEAM_ID, data.userAddTeam._id);
      router.push('/app');
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
