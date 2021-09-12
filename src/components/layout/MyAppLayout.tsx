import BoltIcon from '@mui/icons-material/Bolt';
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Box, Container, IconButton, Typography } from '@mui/material';
import * as React from 'react';
import { StyledToolbar } from './MyAppToolbar';

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
        <StyledToolbar>
          <Box>
            <IconButton color="inherit">
              <HomeIcon />
            </IconButton>
            <IconButton color="inherit">
              <BoltIcon />
            </IconButton>
          </Box>
        </StyledToolbar>
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