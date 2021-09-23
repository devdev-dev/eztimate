import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleIcon from '@mui/icons-material/Circle';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import * as React from 'react';

export type BadgeType = 'ONLINE' | 'ONLINE_READY';

export interface OnlineBadgeAvatarProps {
  onlineBadge?: BadgeType;
  children: React.ReactElement;
}

export default function OnlineBadgeAvatar({ children, onlineBadge }: OnlineBadgeAvatarProps) {
  let BadgeIcon = undefined;
  switch (onlineBadge) {
    case 'ONLINE':
      BadgeIcon = <CircleIcon sx={{ height: '16px', width: '16px', zIndex: 500 }} />;
      break;
    case 'ONLINE_READY':
      BadgeIcon = <CheckCircleIcon sx={{ height: '16px', width: '16px', zIndex: 500 }} />;
      break;
  }

  return (
    <Stack direction="row" spacing={2}>
      {onlineBadge ? (
        <OnlineBadge key={onlineBadge} overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={BadgeIcon}>
          <Avatar>{children}</Avatar>
        </OnlineBadge>
      ) : (
        <Avatar>{children}</Avatar>
      )}
    </Stack>
  );
}

const OnlineBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    zIndex: 400,
    color: '#44b700',
    width: 0,
    '&::after': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 2s 1 ease',
      border: '1px solid currentColor',
      content: '""',
      transform: 'scale(0.6)'
    }
  },
  '@keyframes ripple': {
    '0%': {
      opacity: 0.8
    },
    '100%': {
      transform: 'scale(2.5)',
      opacity: 0
    }
  }
}));