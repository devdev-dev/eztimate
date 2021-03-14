import { List, ListItem, ListItemText, ListSubheader, makeStyles } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React from 'react';

export default function JoinKnownTeam() {
  const classes = useStyles();

  return (
    <>
      <List
        component="nav"
        subheader={
          <ListSubheader component="div" disableGutters>
            Favorite Teams
          </ListSubheader>
        }
        className={classes.root}
        disablePadding
      >
        <ListItem button>
          <ListItemText primary="Team Name" />
          <AccountCircleIcon />
        </ListItem>
      </List>

      <List
        component="nav"
        subheader={
          <ListSubheader component="div" disableGutters>
            History of Teams
          </ListSubheader>
        }
        className={classes.root}
        disablePadding
      >
        <ListItem button>
          <ListItemText primary="Team Name" />
          <AccountCircleIcon />
        </ListItem>
      </List>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  root: {
    width: '100%'
  }
}));
