import { Avatar, Badge, createStyles, makeStyles, Theme, Tooltip, withStyles } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { Skeleton } from '@material-ui/lab';
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
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
      </StyledBadge>
    </Tooltip>
  );
}

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      left: '30%',
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 5s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""'
      }
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0
      }
    }
  })
)(Badge);

export function UserAvatarSkeleton() {
  const classes = useStyles();
  return (
    <Skeleton animation="wave" variant="circle" height="100%" className={`${classes.avatar} ${classes.skeleton}`}>
      <Avatar />
    </Skeleton>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1)
      }
    },
    avatar: {
      boxSizing: 'initial',
      margin: theme.spacing(1),
      marginRight: theme.spacing(-2.75),
      border: '3px solid white'
    },
    skeleton: {
      backgroundColor: 'rgba(220, 220, 220, 1)'
    }
  })
);
