import CampaignIcon from '@mui/icons-material/Campaign';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReplayIcon from '@mui/icons-material/Replay';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Divider, IconButton, InputBase, Menu, MenuItem, Paper } from '@mui/material';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { IssueState, useActiveIssueQuery, useResetActiveIssueMutation, useUpdateActiveIssueMutation } from '../../generated/graphql';
import { useNotificationTrigger } from '../../pusher';
import EstimationSettingsDialog from './EstimationSettingsDialog';

export default function EstimationToolbarIssueControl() {
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
    <Paper
      sx={{
        p: 1,
        display: 'flex',
        alignItems: 'center',
        width: '100%'
      }}
    >
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

      <IconButton onClick={toggleIssueState}>{data?.getActiveIssue?.state === IssueState.COLLECT ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton>
      <IssueMenu />

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

const IssueMenu = () => {
  const triggerNotification = useNotificationTrigger();

  const [menuAnchorElement, setMenuAnchorElement] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchorElement);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorElement(event.currentTarget);
  };

  const handleNotification = () => {
    triggerNotification({
      message: 'Active Estimation in Progress.',
      systemNotification: true
    });
    handleClose();
  };

  const [openSettings, setOpenSettings] = useState(false);
  const handleOpenSettings = () => {
    setOpenSettings(true);
    handleClose();
  };

  const handleClose = () => {
    setMenuAnchorElement(null);
  };

  return (
    <>
      <EstimationSettingsDialog open={openSettings} onClose={() => setOpenSettings(false)} />
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={menuAnchorElement}
        open={menuOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={handleNotification}>
          <CampaignIcon />
          <Divider sx={{ height: 16, m: 1 }} orientation="vertical" />
          Call to Estimation
        </MenuItem>
        <MenuItem onClick={handleOpenSettings}>
          <SettingsIcon />
          <Divider sx={{ height: 16, m: 1 }} orientation="vertical" />
          Settings
        </MenuItem>
      </Menu>
    </>
  );
};