import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleIcon from '@mui/icons-material/Circle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { AvatarGroup, Badge, Box, IconButton } from '@mui/material';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/system';
import * as React from 'react';
import { useActiveIssueQuery, useGetUserQuery } from '../../generated/graphql';
import { useIssueId, usePusherChannel } from '../AppContext';
import UserAvatar, { UserAvatarSkeleton } from '../UserAvatar';
import OnlineBadgeAvatar from './OnlineBadgeAvatar';

export default function EstimationToolbarUserPanel() {
  const channel = usePusherChannel();
  const issueId = useIssueId();

  const { data, loading, error } = useActiveIssueQuery();

  return (
    <Box sx={{ width: '100%', m: 1, display: 'flex', flexGrow: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
      <AvatarGroup>
        {channel &&
          Object.keys(channel?.members?.members).map(memberId => {
            return (
              <UserAvatarWrapper
                key={memberId}
                userId={memberId}
                hasEstimated={(data && data.getActiveIssue && data.getActiveIssue?.estimates.some(e => e.user._id === memberId)) ?? false}
              />
            );
          })}
      </AvatarGroup>
      <IconButton onClick={() => handleCopyID(issueId)}>
        <OnlineBadgeAvatar>
          <PersonAddIcon />
        </OnlineBadgeAvatar>
      </IconButton>
    </Box>
  );
}

function UserAvatarWrapper({ userId, hasEstimated }: { userId: string; hasEstimated?: boolean }) {
  const { data, loading, error } = useGetUserQuery({ variables: { id: userId } });
  const BadgeIcon = <CircleIcon sx={{ height: '16px', width: '16px', zIndex: 500 }} />;
  const CheckBadgeIcon = <CheckCircleIcon sx={{ height: '16px', width: '16px', zIndex: 500 }} />;

  return (
    <>
      {data && !loading && (
        <Stack direction="row" spacing={2}>
          <OnlineBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={hasEstimated ? CheckBadgeIcon : BadgeIcon}>
            {data?.getUser ? <UserAvatar user={data?.getUser} /> : <UserAvatarSkeleton />}
          </OnlineBadge>
        </Stack>
      )}
    </>
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
      border: '1px solid transparent',
      backgroundClip: 'padding-box',
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

function handleCopyID(issueId: string) {
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const el = document.createElement('textarea');
  el.value = `${origin}/instant/?join=${issueId}`;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}