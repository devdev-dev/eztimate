import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ReplayIcon from '@material-ui/icons/Replay';

export default function ButtonAppBar() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Estimate
        </Typography>
        <IconButton size="large" aria-label="search" color="inherit">
          <ReplayIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
