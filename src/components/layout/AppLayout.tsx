import { AppBar, Box, Container, Typography } from '@mui/material';
import * as React from 'react';
import MainAppToolbar from './MainAppToolbar';

export interface AppLayoutProps {
  title: string;
  children: React.ReactElement;
}

export default function AppLayout({ title, children }: AppLayoutProps) {
  return (
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

      <Container maxWidth="lg">
        <Typography variant={'h4'} sx={{ py: 4 }}>
          {title}
        </Typography>
        {children}
      </Container>
    </Box>
  );
}