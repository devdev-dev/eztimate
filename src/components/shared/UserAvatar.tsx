import { Avatar, Badge, createStyles, makeStyles, Theme, Tooltip, withStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { User } from '../../apollo/types.grapqhl';

export type UserAvatarProps = {
  user: Pick<User, 'email' | 'username'>;
  avatar?: React.ReactNode;
  online?: boolean;
  shift?: boolean;
};

export default function UserAvatar({ user, avatar, online, shift }: UserAvatarProps) {
  const classes = useStyles({ shift });

  const avatarComponent = avatar ? (
    <Avatar className={classes.avatar}>{avatar}</Avatar>
  ) : (
    <Tooltip title={user.username ?? user.email}>
      <Avatar className={classes.avatar}>{getInitials(user.username ?? user.email)}</Avatar>
    </Tooltip>
  );

  return (
    <StyledBadge
      overlap="circle"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      variant="dot"
      badgeContent={online ? 1 : 0}
    >
      {avatarComponent}
    </StyledBadge>
  );
}

function getInitials(name: string) {
  return (
    name &&
    name
      .split(' ')
      .slice(0, 2)
      .map(i => i.charAt(0))
      .join('')
      .toUpperCase()
  );
}

export function UserAvatarSkeleton({ shift = false }) {
  const classes = useStyles({ shift });
  return (
    <Skeleton animation="wave" variant="circle" height="100%" className={`${classes.avatar} ${classes.skeleton}`}>
      <Avatar />
    </Skeleton>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: (props: { shift: boolean }) => ({
      boxSizing: 'initial',
      margin: theme.spacing(1),
      border: '3px solid white',

      marginRight: theme.spacing(props.shift ? -2.5 : 0)
    }),
    skeleton: {
      backgroundColor: 'rgba(220, 220, 220, 1)'
    }
  })
);

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      left: '50%',
      bottom: '25%',
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
