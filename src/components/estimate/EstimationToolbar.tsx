import { Avatar, AvatarGroup, Box, Divider, InputBase, Paper } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PersonIcon from '@material-ui/icons/Person';
import ReplayIcon from '@material-ui/icons/Replay';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { IssueState, useActiveIssueQuery, useResetActiveIssueMutation, useUpdateActiveIssueMutation } from '../../generated/graphql';
import { usePusherChannel } from '../AppContext';

export default function EstimationToolbar() {
  const channel = usePusherChannel();

  const { data, loading, error } = useActiveIssueQuery();
  const [resetActiveIssue] = useResetActiveIssueMutation();
  const [updateActiveIssue] = useUpdateActiveIssueMutation();

  const [issueName, setIssueName] = useState(data?.getActiveIssue?.name);
  useEffect(() => {
    setIssueName(data?.getActiveIssue?.name);
  }, [data]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
          <IconButton sx={{ p: '10px' }} aria-label="menu">
            <MoreVertIcon />
          </IconButton>
          <InputBase
            autoComplete="off"
            onChange={e => {
              setIssueName(e.target.value);
            }}
            onBlur={e => updateActiveIssue({ variables: { name: e.target.value } })}
            onKeyDown={e => {
              if (e.key === 'Escape') setIssueName(data?.getActiveIssue?.name);
              if (e.key === 'Enter') updateActiveIssue({ variables: { name: issueName } });
            }}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Rename Issue"
            value={issueName}
          />
          <IconButton
            type="submit"
            sx={{ p: '10px' }}
            onClick={() =>
              updateActiveIssue({ variables: { state: data?.getActiveIssue?.state === IssueState.COLLECT ? IssueState.DISCUSS : IssueState.COLLECT } })
            }
          >
            {data?.getActiveIssue?.state === IssueState.COLLECT ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton color="primary" sx={{ p: '10px' }} onClick={() => resetActiveIssue()}>
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
      </Toolbar>
    </AppBar>
  );
}
