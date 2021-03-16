import { Avatar, IconButton, makeStyles, TextField, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import LaunchIcon from '@material-ui/icons/Launch';
import { gql, request } from 'graphql-request';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { CookieName } from '../../../utils/types';

export default function CreateNewTeam() {
  const classes = useStyles();
  const router = useRouter();

  const mutation = gql`
    mutation CreateTeam($teamName: String!) {
      teamCreate(teamName: $teamName) {
        _id
      }
    }
  `;

  const textFieldRef = useRef<HTMLInputElement>(null);
  const handleCreateTeam = () => {
    request('/api/graphql', mutation, { teamName: textFieldRef.current?.value }).then(data => {
      Cookies.set(CookieName.TEAM_ID, data.teamCreate._id);
      router.push('/app');
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

      <TextField
        className={classes.teamInput}
        size="small"
        margin="normal"
        id="joinTeam"
        variant="outlined"
        placeholder="Join a new team (ID)"
        fullWidth={true}
        inputRef={textFieldRef}
        autoComplete="off"
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleCreateTeam}>
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
  teamInput: {
    '& .MuiOutlinedInput-adornedEnd': {
      paddingRight: 0
    }
  }
}));
