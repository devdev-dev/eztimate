import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { AvatarGroup, Box, IconButton } from '@mui/material';
import * as React from 'react';
import { useActiveIssueQuery } from '../../generated/graphql';
import { useIssueId, usePusherChannel } from '../AppContext';
import MyAppAvatar from '../MyAppAvatar';

export default function EstimationToolbarUserPanel() {
  const channel = usePusherChannel();
  const issueId = useIssueId();

  const {data, loading, error} = useActiveIssueQuery();

  return (
      <>
        <Box sx={{display: 'flex', justifyContent: 'flex-end', flexGrow: 1}}>
          <AvatarGroup>
            {channel &&
            Object.keys(channel?.members?.members).map(memberId => {
              const badge = data && data.getActiveIssue && data.getActiveIssue?.estimates.find(e => e.user._id === memberId) ? 'ONLINE_READY' : 'ONLINE';
              return (
                  <MyAppAvatar key={memberId} onlineBadge={badge}>
                    <PersonIcon/>
                  </MyAppAvatar>
              );
            })}
          </AvatarGroup>
        </Box>
        <IconButton onClick={() => handleCopyID(issueId)}>
          <MyAppAvatar>
            <PersonAddIcon/>
          </MyAppAvatar>
        </IconButton>
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