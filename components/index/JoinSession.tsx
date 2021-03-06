import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import React from 'react';
import Copyright from './Copyright';

export default function JoinSession() {
  const classes = useStyles();

  const handleButtonClick = () => {
    fetch('/api/session/create')
      .then(response => console.log(`A nice response after create - ${response}`))
      .catch(error => console.error(`Something went wrong - ${error}`));
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <GroupAddIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Join Estimation
      </Typography>
      <TextField variant="outlined" margin="normal" required fullWidth id="session_id" label="Session ID to Join" name="session_id" autoFocus />
      <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={handleButtonClick}>
        Join
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
