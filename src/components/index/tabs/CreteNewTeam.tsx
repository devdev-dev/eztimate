import { Avatar, Box, IconButton, makeStyles, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
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
      <Box display="flex" alignItems="center">
        <Avatar className={classes.avatar}>
          <AddIcon />
        </Avatar>
        <TextField
          className={classes.textField}
          id="createTeam"
          variant="outlined"
          placeholder="Team Name"
          label="Create a new team"
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
      </Box>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main
  },
  textField: {
    margin: theme.spacing(2),
    '& .MuiOutlinedInput-adornedEnd': {
      paddingRight: 0
    }
  }
}));
