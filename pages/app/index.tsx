import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from 'react';
import CheckboxList from '../../components/CheckboxList';
import withAppLayout from '../../components/withAppLayout';

const Dashboard = () => {
  const classes = useStyles();
  return (
    <div style={{ height: 'calc(100vh - 100px)', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" flex="2" alignContent="flex-start">
        TEXT
      </Box>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  card: {
    maxHeight: '250px',
    display: 'flex',
    flexDirection: 'column'
  },
  cardc: {
    height: '100%',
    overflowY: 'auto'
  },
  title: {
    fontSize: 14
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default withAppLayout(Dashboard);
