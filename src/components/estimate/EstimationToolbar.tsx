import { Avatar, Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import ReplayIcon from '@material-ui/icons/Replay';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import * as React from 'react';
import { IssueState, useActiveIssueQuery, useResetActiveIssueMutation, useUpdateActiveIssueMutation } from '../../generated/graphql';
import { usePusherChannel } from '../AppContext';

export default function EstimationToolbar() {
  const channel = usePusherChannel();

  const { data, loading, error } = useActiveIssueQuery();
  const [resetActiveIssue] = useResetActiveIssueMutation();
  const [updateActiveIssue] = useUpdateActiveIssueMutation();

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <IconButton edge="start" title="Reset Issue" onClick={() => resetActiveIssue()}>
          <ReplayIcon />
        </IconButton>
        <IconButton
          title="Toggle Issue State"
          onClick={() =>
            updateActiveIssue({ variables: { state: data?.getActiveIssue?.state === IssueState.COLLECT ? IssueState.DISCUSS : IssueState.COLLECT } })
          }
        >
          {data?.getActiveIssue?.state === IssueState.COLLECT ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Estimate: {data?.getActiveIssue?.name}
        </Typography>
        <Box
          sx={{
            display: 'flex'
          }}
        >
          {channel &&
            Object.keys(channel?.members?.members).map(memberId => (
              <Avatar variant="rounded" key={memberId}>
                <PersonIcon />
              </Avatar>
            ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
