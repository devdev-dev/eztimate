import { css } from '@emotion/css';
import BoltIcon from '@mui/icons-material/Bolt';
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Box, Container, Grid, IconButton, LinearProgress, styled, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';
import ActiveUserPanel from './activeuser/ActiveUserPanel';
import { AppContextProvider, useAppLoading } from './AppContext';

export interface AppLayoutProps {
  title: string;
  children: React.ReactElement;
}

export default function AppLayout({ title, children }: AppLayoutProps) {
  return (
    <AppContextProvider>
      <Box
        sx={{
          bgcolor: '#dee9f3',
          minHeight: '100vh'
        }}
      >
        <MainAppToolbar />
        <Container maxWidth="lg">{children}</Container>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </AppContextProvider>
  );
}

function MainAppToolbar() {
  const globalLoading = useAppLoading();
  console.log(globalLoading);

  return (
    <AppBar position="sticky" color="transparent" variant="outlined" elevation={0} sx={{ bgcolor: 'white' }}>
      <Toolbar>
        <Grid container sx={{ p: 1, alignItems: 'center' }}>
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
      </Toolbar>
      <Box sx={{ width: '100%' }}>
        <LinearProgress sx={{ visibility: !globalLoading.value ? 'hidden' : 'visible' }} />
      </Box>
    </AppBar>
  );
}

const styles = {
  navigation: css`
    text-align: center;
  `,
  activeUser: css`
    text-align: end;
  `
};

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '} DeviantDev {new Date().getFullYear()}
    </Typography>
  );
}
