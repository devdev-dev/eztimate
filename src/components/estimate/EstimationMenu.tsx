import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Chip, IconButton, Tooltip } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import { useState } from 'react';
import * as React from 'react';
import EstimationSettingsDialog from './settings/EstimationSettingsDialog';
export default function EstimationMenu() {
  const [openSettings, setOpenSettings] = useState(false);
  const handleOpenSettings = () => {
    setOpenSettings(true);
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Chip label="Settings" component="a" onClick={handleOpenSettings} clickable />
      {openSettings && <EstimationSettingsDialog open={openSettings} onClose={() => setOpenSettings(false)} />}
    </Box>
  );
}
