import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import * as React from 'react';

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
        <Toolbar>
          <Button autoFocus onClick={onClose} variant="contained">
            close
          </Button>
        </Toolbar>
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
