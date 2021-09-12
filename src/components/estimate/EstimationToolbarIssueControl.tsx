import CampaignIcon from '@mui/icons-material/Campaign';
import ReplayIcon from '@mui/icons-material/Replay';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Divider, IconButton, InputBase, Paper } from '@mui/material';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { IssueState, useActiveIssueQuery, useResetActiveIssueMutation, useUpdateActiveIssueMutation } from '../../generated/graphql';
import { useNotificationTrigger } from '../../pusher';

export default function EstimationToolbarIssueControl() {
  const { data, loading, error } = useActiveIssueQuery();
  const [resetActiveIssue] = useResetActiveIssueMutation();
  const [updateActiveIssue] = useUpdateActiveIssueMutation();

  const triggerNotification = useNotificationTrigger();

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
    <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '420px' }}>
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

      <IconButton
        onClick={() =>
          triggerNotification({
            message: 'Active Estimation in Progress.',
            systemNotification: true
          })
        }
      >
        <CampaignIcon />
      </IconButton>
      <IconButton onClick={toggleIssueState}>{data?.getActiveIssue?.state === IssueState.COLLECT ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton>
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
  );
}