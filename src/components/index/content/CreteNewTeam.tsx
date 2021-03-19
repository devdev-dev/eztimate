import { useMutation } from '@apollo/client';
import { Avatar, Box, IconButton, makeStyles, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { CookieName } from '../../../utils/types';
import { USER_CREATE_TEAM_MUTATION } from '../index.gql';

export default function CreateNewTeam() {
  const classes = useStyles();
  const router = useRouter();

  const [createTeam] = useMutation(USER_CREATE_TEAM_MUTATION);

  const textFieldRef = useRef<HTMLInputElement>(null);
  const handleCreateTeam = () => {
    createTeam({ variables: { teamName: textFieldRef.current?.value } }).then(result => {
      Cookies.set(CookieName.TEAM_ID, result.data.teamCreate._id);
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
