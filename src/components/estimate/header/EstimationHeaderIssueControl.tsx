import CampaignIcon from '@mui/icons-material/Campaign';
import ReplayIcon from '@mui/icons-material/Replay';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Divider, IconButton, InputBase, Paper, Skeleton, Tooltip } from '@mui/material';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { IssueState, useActiveIssueQuery, useResetActiveIssueMutation, useUpdateActiveIssueMutation } from '../../../generated/graphql';
import { useNotificationTrigger } from '../../../pusher';
import { useAppLoading } from '../../layout/AppContext';

export default function EstimationHeaderIssueControl() {
  const { data, loading } = useActiveIssueQuery();
  const appLoading = useAppLoading();
  const triggerNotification = useNotificationTrigger();
  const [resetActiveIssue] = useResetActiveIssueMutation();
  const [updateActiveIssue] = useUpdateActiveIssueMutation();

  const inputRef = useRef<HTMLInputElement>(null);
  const [issueName, setIssueName] = useState(data?.getActiveIssue?.name);
  useEffect(() => {
    setIssueName(data?.getActiveIssue?.name);
  }, [data]);

  const updateIssueName = () => {
    if (data?.getActiveIssue?.name !== issueName) {
      appLoading.set(true);
      updateActiveIssue({ variables: { input: { name: issueName } } }).then(() => {
        appLoading.set(false);
      });
    }
  };
  const toggleIssueState = () => {
    const newState = data?.getActiveIssue?.state === IssueState.COLLECT ? IssueState.DISCUSS : IssueState.COLLECT;
    if (data && data.getActiveIssue) {
      appLoading.set(true);
      updateActiveIssue({
        variables: { input: { state: newState } }
      }).then(() => appLoading.set(false));
    }
  };

  const handleReset = () => {
    appLoading.set(true);
    resetActiveIssue().then(() => {
      appLoading.set(false);
      return inputRef.current?.focus();
    });
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
            onBlur={updateIssueName}
            onKeyDown={e => {
              if (e.key === 'Escape' || e.key === 'Enter') {
                inputRef.current?.blur();
              }
            }}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Issue under Estimation"
            value={issueName}
            disabled={appLoading.value}
          />

          <Tooltip title={data?.getActiveIssue?.state === IssueState.COLLECT ? 'Reveal Results' : 'Hide Results'}>
            <IconButton onClick={toggleIssueState} disabled={appLoading.value}>
              {data?.getActiveIssue?.state === IssueState.COLLECT ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Send Notification">
            <IconButton disabled={appLoading.value} onClick={handleNotification}>
              <CampaignIcon />
            </IconButton>
          </Tooltip>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <Tooltip title="Reset Estimation">
            <IconButton disabled={appLoading.value} color="primary" sx={{ p: '10px' }} onClick={handleReset}>
              <ReplayIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Paper>
  );
}
