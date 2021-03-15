import { Avatar, makeStyles, Tooltip } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';

export type UserAvatarProps = {
  user: any;
};

export default function UserAvatar({ user }: UserAvatarProps) {
  const classes = useStyles();

  return (
    <Tooltip title={user.email}>
      <Avatar className={classes.userAvatar}>
        <PersonIcon />
      </Avatar>
    </Tooltip>
  );
}

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  root: {
    width: '100%'
  },
  userAvatar: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(-2),
    border: '3px solid white'
  }
}));
