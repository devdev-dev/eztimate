import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ReplayIcon from '@material-ui/icons/Replay';
import * as React from 'react';
import { useState } from 'react';

export default function ButtonAppBar() {
  const [isRevealed, setRevealed] = useState(false);

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <IconButton size="large" aria-label="search" color="inherit" title="New Estimation">
          <ReplayIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Estimate
        </Typography>

        <Button variant="contained" color="primary" onClick={() => setRevealed(!isRevealed)}>
          {isRevealed ? 'Hide Results' : 'Reveal Results'}
        </Button>
      </Toolbar>
    </AppBar>
  );
}
