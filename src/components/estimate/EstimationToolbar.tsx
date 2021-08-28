import { Avatar, Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ReplayIcon from '@material-ui/icons/Replay';
import * as React from 'react';
import { usePusherChannel } from '../AppContext';

export default function EstimationToolbar() {
  const channel = usePusherChannel();
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <IconButton size="large" aria-label="search" color="inherit" title="New Estimation">
          <ReplayIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Estimate
        </Typography>
        <Box
          sx={{
            display: 'flex'
          }}
        >
          {channel &&
            Object.keys(channel?.members?.members).map(memberId => (
              <Avatar variant="rounded" key={memberId}>
                {memberId.charAt(0)}
              </Avatar>
            ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}