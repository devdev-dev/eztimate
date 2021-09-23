import { AppBar, Box, Container, Typography } from '@mui/material';
import * as React from 'react';
import MyAppToolbar from './toolbar/MyAppToolbar';

export interface MyAppLayoutProps {
  title: string;
  children: React.ReactElement;
}

export default function MyAppLayout({ title, children }: MyAppLayoutProps) {
  return (
    <Box
      sx={{
        bgcolor: '#dee9f3',
        height: '100vh',
        width: '100%'
      }}
    >
      <AppBar position="relative" color="transparent" variant="outlined" elevation={0} sx={{ bgcolor: 'white' }}>
        <MyAppToolbar />
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