import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { AvatarGroup, Box, IconButton } from '@mui/material';
import * as React from 'react';
import { useActiveIssueQuery } from '../../generated/graphql';
import { useIssueId, usePusherChannel } from '../AppContext';
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
            const userEstimate = data && data.getActiveIssue && data.getActiveIssue?.estimates.find(e => e.user._id === memberId);
            const badge = userEstimate ? 'ONLINE_READY' : 'ONLINE';
            return (
              <OnlineBadgeAvatar key={memberId + userEstimate?.value} onlineBadge={badge}>
                <PersonIcon />
              </OnlineBadgeAvatar>
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

function handleCopyID(issueId: string) {
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const el = document.createElement('textarea');
  el.value = `${origin}/instant/?join=${issueId}`;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}