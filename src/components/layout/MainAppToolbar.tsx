import { css } from '@emotion/css';
import BoltIcon from '@mui/icons-material/Bolt';
import HomeIcon from '@mui/icons-material/Home';
import { Grid, IconButton, styled, Toolbar } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';
import ActiveUserPanel from './activeuser/ActiveUserPanel';

export default function MainAppToolbar() {
  return (
    <StyledToolbar>
      <Grid container>
        <Grid item xs={3}>
          &nbsp;
        </Grid>
        <Grid item xs className={styles.navigation}>
          <Link href="/" passHref>
            <IconButton color="inherit">
              <HomeIcon />
            </IconButton>
          </Link>
          <Link href="/instant" passHref>
            <IconButton color="inherit">
              <BoltIcon />
            </IconButton>
          </Link>
        </Grid>
        <Grid item xs={3} className={styles.activeUser}>
          <ActiveUserPanel />
        </Grid>
      </Grid>
    </StyledToolbar>
  );
}

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 128
  }
}));

const styles = {
  navigation: css`
    text-align: center;
  `,
  activeUser: css`
    text-align: end;
  `
};
