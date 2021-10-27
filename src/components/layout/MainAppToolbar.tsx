import { css } from '@emotion/css';
import BoltIcon from '@mui/icons-material/Bolt';
import HomeIcon from '@mui/icons-material/Home';
import { Box, Grid, IconButton, LinearProgress, styled, Toolbar } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';
import ActiveUserPanel from './activeuser/ActiveUserPanel';
import { useAppLoading } from './AppContext';

export default function MainAppToolbar() {
  const globalLoading = useAppLoading();
  console.log(globalLoading);

  return (
    <>
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
      <Box sx={{ width: '100%' }}>
        <LinearProgress sx={{ visibility: !globalLoading.value ? 'hidden' : 'visible' }} />
      </Box>
    </>
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
