import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReplayIcon from '@mui/icons-material/Replay';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Avatar, AvatarGroup, Box, Divider, IconButton, InputBase, Paper, Toolbar } from '@mui/material';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { IssueState, useActiveIssueQuery, useResetActiveIssueMutation, useUpdateActiveIssueMutation } from '../../generated/graphql';
import { useIssueId, usePusherChannel } from '../AppContext';
import EstimationSettingsDialogButton from './EstimationSettingsDialogButton';

export default function EstimationToolbar() {
  const channel = usePusherChannel();
  const issueId = useIssueId();

  const { data, loading, error } = useActiveIssueQuery();
  const [resetActiveIssue] = useResetActiveIssueMutation();
  const [updateActiveIssue] = useUpdateActiveIssueMutation();

  const inputRef = useRef<HTMLInputElement>(null);
  const [issueName, setIssueName] = useState(data?.getActiveIssue?.name);
  useEffect(() => {
    setIssueName(data?.getActiveIssue?.name);
  }, [data]);

  const toggleIssueState = () => {
    const newState = data?.getActiveIssue?.state === IssueState.COLLECT ? IssueState.DISCUSS : IssueState.COLLECT;
    if (data && data.getActiveIssue)
      updateActiveIssue({
        variables: { state: newState },
        optimisticResponse: {
          updateActiveIssue: {
            ...data!.getActiveIssue,
            state: newState
          }
        }
      });
  };

  return (
    <Toolbar disableGutters>
      <EstimationSettingsDialogButton />
      <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
        <InputBase
          inputRef={inputRef}
          autoComplete="off"
          onChange={e => {
            setIssueName(e.target.value);
          }}
          onBlur={e => {
            if (data?.getActiveIssue?.name !== issueName) updateActiveIssue({ variables: { name: issueName } });
          }}
          onKeyDown={e => {
            if (e.key === 'Escape' || e.key === 'Enter') {
              inputRef.current?.blur();
            }
          }}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Issue under Estimation"
          value={issueName}
        />
        <IconButton type="submit" sx={{ p: '10px' }} onClick={toggleIssueState}>
          {data?.getActiveIssue?.state === IssueState.COLLECT ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{ p: '10px' }}
          onClick={() => {
            resetActiveIssue().then(() => inputRef.current?.focus());
          }}
        >
          <ReplayIcon />
        </IconButton>
      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
        <AvatarGroup max={6}>
          {channel &&
            Object.keys(channel?.members?.members).map(memberId => (
              <Avatar key={memberId}>
                <PersonIcon />
              </Avatar>
            ))}
        </AvatarGroup>
      </Box>
      <IconButton onClick={() => handleCopyID(issueId)}>
        <Avatar>
          <PersonAddIcon />
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