import { AppBar, Box, Button, Container, Typography } from '@mui/material';
import * as React from 'react';
import { StyledToolbar } from './MainAppToolbar';

export interface MyAppLayoutProps {
  title: string;
  onClose: () => void;
  onSave: () => void;
  children: React.ReactElement;
}

export default function SettingsLayout({ title, onClose, onSave, children }: MyAppLayoutProps) {
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
          <Button color="inherit" onClick={onClose}>
            close
          </Button>
          <Button autoFocus onClick={onSave} variant="contained">
            save
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