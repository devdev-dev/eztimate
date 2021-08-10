import { usePresenceChannel } from '@harelpls/use-pusher';
import { Avatar, Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ReplayIcon from '@material-ui/icons/Replay';
import Cookies from 'js-cookie';
import * as React from 'react';
import { CookieName } from '../../cookies';

export default function ButtonAppBar() {
  const { channel } = usePresenceChannel(`presence-${Cookies.get(CookieName.ESTIMATE_ID)}`);
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
          {channel && Object.keys(channel?.members?.members).map(memberId => <Avatar key={memberId}>{memberId}</Avatar>)}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
