import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import * as React from 'react';
import { useState } from 'react';
import ActiveUserSettingsDialog from './ActiveUserSettingsDialog';

export default function ActiveUser() {
  const [openSettings, setOpenSettings] = useState(false);
  const handleOpenSettings = () => {
    setOpenSettings(true);
  };

  return (
    <>
      <ActiveUserSettingsDialog open={openSettings} onClose={() => setOpenSettings(false)} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Box>Anonymous Anonymous</Box>
        <Stack direction="row" spacing={2}>
          <IconButton onClick={handleOpenSettings}>
            <MenuBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={<ArrowDropDownIcon />}>
              <Avatar>
                <PersonAddIcon />
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