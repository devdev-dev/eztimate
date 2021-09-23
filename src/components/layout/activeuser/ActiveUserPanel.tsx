import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import * as React from 'react';
import { useState } from 'react';
import ActiveUserSettingsDialog from './ActiveUserSettingsDialog';

export default function ActiveUserPanel() {
  const [openSettings, setOpenSettings] = useState(false);
  const handleOpenSettings = () => {
    setOpenSettings(true);
  };

  return (
    <>
      <ActiveUserSettingsDialog open={openSettings} onClose={() => setOpenSettings(false)} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Box>
          <Typography variant="subtitle2" noWrap>
            Anonymous
          </Typography>
          <Typography variant="caption">Login / Register</Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <IconButton onClick={handleOpenSettings}>
            <MenuBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={<SettingsIcon fontSize="small" />}>
              <Avatar>
                <SentimentVerySatisfiedIcon />
              </Avatar>
            </MenuBadge>
          </IconButton>
        </Stack>
      </Box>
    </>
  );
}

const MenuBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    left: '50%',
    bottom: '10%',
    color: '#AAA',
    backgroundColor: 'white',
    zIndex: 400,
    width: 0,
    '&::after': {
      position: 'absolute',
      borderRadius: '50%',
      width: '100%',
      height: '100%',
      content: '""',
      transform: 'scale(0.6)'
    }
  }
}));