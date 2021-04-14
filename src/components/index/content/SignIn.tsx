import { Avatar, Box, IconButton, makeStyles, TextField } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import LockIcon from '@material-ui/icons/Lock';
import { signIn } from 'next-auth/client';
import React, { useRef } from 'react';

export default function SignIn() {
  const classes = useStyles();

  const textFieldRef = useRef<HTMLInputElement>(null);
  const handleSignIn = () => {
    signIn('email', { redirect: true, email: textFieldRef.current.value }).catch(error => console.error(JSON.stringify(error)));
  };

  return (
    <form>
      <Box display="flex" alignItems="center">
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <TextField
          className={classes.textField}
          id="signIn"
          variant="outlined"
          placeholder="Email Address"
          label="Sign In to get started"
          fullWidth={true}
          inputRef={textFieldRef}
          onKeyDown={e => e.key === 'Enter' && handleSignIn()}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSignIn}>
                <ArrowForwardIosIcon />
              </IconButton>
            )
          }}
        />
      </Box>
    </form>
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
