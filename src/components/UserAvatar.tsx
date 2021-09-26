import { Avatar, Skeleton, Tooltip } from '@mui/material';
import React from 'react';
import { User } from '../generated/graphql';

export type UserAvatarProps = {
  user: Pick<User, 'name' | 'avatar'>;
};

export default function UserAvatar({ user }: UserAvatarProps) {
  return (
    <Tooltip title={user.name ?? ''}>
      <Avatar src={`${user.avatar}`}>{getInitials(`${user.name}`)}</Avatar>
    </Tooltip>
  );
}

export function UserAvatarSkeleton() {
  return (
    <Skeleton variant="circular" height="100%">
      <Avatar />
    </Skeleton>
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