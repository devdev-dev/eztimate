import { Avatar, Badge, createStyles, makeStyles, Theme, Tooltip, withStyles } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';

export type UserAvatarProps = {
  user: any;
  online?: boolean;
};

export default function UserAvatar({ user, online }: UserAvatarProps) {
  const classes = useStyles();

  return (
    <Tooltip title={user.email} className={classes.root}>
      <StyledBadge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        variant="dot"
        badgeContent={online ? 1 : 0}
      >
        <Avatar className={classes.userAvatar}>
          <PersonIcon />
        </Avatar>
      </StyledBadge>
    </Tooltip>
  );
}

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      marginRight: theme.spacing(-2)
    }
  },
  userAvatar: {
    border: '3px solid white'
  }
}));

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      left: '60%',
      bottom: '0%',
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 10s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""'
      }
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1
      },
      '10%': {
        transform: 'scale(2.4)',
        opacity: 0
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0
      }
    }
  })
)(Badge);
