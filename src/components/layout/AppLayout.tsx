import { AppBar, Box, Container, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import * as React from 'react';
import { AppContextProvider } from './AppContext';
import MainAppToolbar from './MainAppToolbar';

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
          height: '100vh',
          width: '100%'
        }}
      >
        <AppBar position="relative" color="transparent" variant="outlined" elevation={0} sx={{ bgcolor: 'white' }}>
          <MainAppToolbar />
        </AppBar>

        <Container maxWidth="lg">{children}</Container>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </AppContextProvider>
  );
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
