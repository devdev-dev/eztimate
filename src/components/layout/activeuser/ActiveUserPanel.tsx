import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import * as React from 'react';
import { useState } from 'react';
import { useActiveUserQuery } from '../../../generated/graphql';
import UserAvatar, { UserAvatarSkeleton } from '../../UserAvatar';
import ActiveUserSettingsDialog from './ActiveUserSettingsDialog';

export default function ActiveUserPanel() {
  const [openSettings, setOpenSettings] = useState(false);
  const handleOpenSettings = () => {
    setOpenSettings(true);
  };

  const { data, loading, error } = useActiveUserQuery();

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Box>
          <Typography variant="subtitle2" noWrap>
            {data?.getActiveUser?.name}
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <IconButton onClick={handleOpenSettings}>
            <MenuBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={<SettingsIcon fontSize="small" />}>
              {data?.getActiveUser ? <UserAvatar user={data?.getActiveUser} tooltip="Profile Settings" /> : <UserAvatarSkeleton />}
            </MenuBadge>
          </IconButton>
        </Stack>
      </Box>
      {openSettings && <ActiveUserSettingsDialog onClose={() => setOpenSettings(false)} />}
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
