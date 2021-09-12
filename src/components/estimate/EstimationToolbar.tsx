import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Avatar, AvatarGroup, Box, IconButton, Toolbar } from '@mui/material';
import * as React from 'react';
import { useIssueId, usePusherChannel } from '../AppContext';
import EstimationSettingsDialogButton from './EstimationSettingsDialogButton';
import EstimationToolbarIssueControl from './EstimationToolbarIssueControl';

export default function EstimationToolbar() {
  const channel = usePusherChannel();
  const issueId = useIssueId();

  return (
      <Toolbar disableGutters>
        <EstimationSettingsDialogButton/>
        <EstimationToolbarIssueControl/>
        <Box sx={{display: 'flex', justifyContent: 'flex-end', flexGrow: 1}}>
          <AvatarGroup max={6}>
            {channel &&
            Object.keys(channel?.members?.members).map(memberId => (
                <Avatar key={memberId}>
                  <PersonIcon/>
                </Avatar>
            ))}
          </AvatarGroup>
        </Box>
        <IconButton onClick={() => handleCopyID(issueId)}>
          <Avatar>
            <PersonAddIcon/>
          </Avatar>
        </IconButton>
      </Toolbar>
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