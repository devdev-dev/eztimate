import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleIcon from '@mui/icons-material/Circle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Avatar, AvatarGroup, Badge, Box, IconButton } from '@mui/material';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import { useActiveIssueQuery, useGetUserQuery } from '../../../generated/graphql';
import { useIssueId, usePusherChannel } from '../../AppContext';
import UserAvatar, { UserAvatarSkeleton } from '../../UserAvatar';

export default function EstimationHeaderUserPanel() {
  const channel = usePusherChannel();
  const issueId = useIssueId();

  const { data, loading, error } = useActiveIssueQuery();

  return (
    <Box sx={{ width: '100%', m: 1, display: 'flex', flexGrow: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
      <AvatarGroup max={10}>
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
        <Avatar>
          <PersonAddIcon />
        </Avatar>
      </IconButton>
    </Box>
  );
}

function UserAvatarWrapper({ userId, hasEstimated }: { userId: string; hasEstimated?: boolean }) {
  const { data, loading, error } = useGetUserQuery({ variables: { id: userId } });
  const BadgeIcon = hasEstimated ? (
    <CheckCircleIcon sx={{ height: '16px', width: '16px', zIndex: 500 }} />
  ) : (
    <CircleIcon sx={{ height: '16px', width: '16px', zIndex: 500 }} />
  );
  return (
    <>
      {data && !loading && (
        <Stack direction="row" spacing={2}>
          <Badge sx={{ color: '#44b700' }} overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={BadgeIcon}>
            {data?.getUser ? <UserAvatar user={data?.getUser} /> : <UserAvatarSkeleton />}
          </Badge>
        </Stack>
      )}
    </>
  );
}

function handleCopyID(issueId: string) {
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const el = document.createElement('textarea');
  el.value = `${origin}/instant/?join=${issueId}`;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}
