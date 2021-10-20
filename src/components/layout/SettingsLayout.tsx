import { AppBar, Box, Button, Container, Typography } from '@mui/material';
import * as React from 'react';
import { StyledToolbar } from './MainAppToolbar';

export interface SettingsLayoutProps {
  title: string;
  onClose: () => void;
  children: React.ReactElement;
}

export default function SettingsLayout({ title, onClose, children }: SettingsLayoutProps) {
  return (
    <Box
      sx={{
        bgcolor: '#dee9f3',
        height: '100vh',
        width: '100%'
      }}
    >
      <AppBar position="sticky" color="transparent" variant="outlined" elevation={0} sx={{ bgcolor: 'white' }}>
        <StyledToolbar>
          <Button autoFocus onClick={onClose} variant="contained">
            close
          </Button>
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