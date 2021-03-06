import { Avatar, Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';
import React from 'react';
import Copyright from './Copyright';
export default function CreateSession() {
  const classes = useStyles();

  const handleButtonClick = () => {
    fetch('/api/session/create')
      .then(response => console.log(`A nice response after create - ${response}`))
      .catch(error => console.error(`Something went wrong - ${error}`));
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LaunchIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Start Estimating
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="session_name"
        label="Name of your estimation session"
        name="session_name"
        autoFocus
      />
      <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={handleButtonClick}>
        Create
      </Button>
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
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
