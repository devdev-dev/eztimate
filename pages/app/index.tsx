import { Box } from '@material-ui/core';
import React from 'react';
import withAppLayout from '../../components/withAppLayout';

const Dashboard = () => {
  return (
    <div style={{ height: 'calc(100vh - 100px)', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" flex="2" alignContent="flex-start">
        TEXT
      </Box>
    </div>
  );
};

export default withAppLayout(Dashboard);
