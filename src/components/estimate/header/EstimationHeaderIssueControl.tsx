import CampaignIcon from '@mui/icons-material/Campaign';
import ReplayIcon from '@mui/icons-material/Replay';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Divider, IconButton, InputBase, Menu, MenuItem, Paper, Skeleton, Tooltip } from '@mui/material';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { IssueState, useActiveIssueQuery, useResetActiveIssueMutation, useUpdateActiveIssueMutation } from '../../../generated/graphql';
import { useNotificationTrigger } from '../../../pusher';
import EstimationSettingsDialog from '../settings/EstimationSettingsDialog';

export default function EstimationHeaderIssueControl() {
  const { data, loading, error } = useActiveIssueQuery();
  const triggerNotification = useNotificationTrigger();
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
        variables: { input: { state: newState } },
        optimisticResponse: {
          updateActiveIssue: {
            ...data!.getActiveIssue,
            state: newState
          }
        }
      });
  };

  const handleReset = () => {
    resetActiveIssue().then(() => inputRef.current?.focus());
  };

  const handleNotification = () => {
    triggerNotification({
      message: 'Active Estimation in Progress.',
      systemNotification: true
    });
  };

  return (
    <Paper
      sx={{
        p: 1,
        display: 'flex',
        alignItems: 'center',
        width: '100%'
      }}
    >
      {loading && !data && <Skeleton variant="rectangular" width="100%" height="44px" />}
      {!loading && data && (
        <>
          <InputBase
            inputRef={inputRef}
            autoComplete="off"
            onChange={e => {
              setIssueName(e.target.value);
            }}
            onBlur={e => {
              if (data?.getActiveIssue?.name !== issueName) updateActiveIssue({ variables: { input: { name: issueName } } });
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

          <Tooltip title={data?.getActiveIssue?.state === IssueState.COLLECT ? 'Reveal Results' : 'Hide Results'}>
            <IconButton onClick={toggleIssueState}>
              {data?.getActiveIssue?.state === IssueState.COLLECT ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Send Notification">
            <IconButton onClick={handleNotification}>
              <CampaignIcon />
            </IconButton>
          </Tooltip>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <Tooltip title="Reset Estimation">
            <IconButton color="primary" sx={{ p: '10px' }} onClick={handleReset}>
              <ReplayIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Paper>
  );
}
