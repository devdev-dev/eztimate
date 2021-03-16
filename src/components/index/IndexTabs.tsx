import { Divider } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import { useSession } from 'next-auth/client';
import React from 'react';
import SignInOut from './SignInOut';
import CreateNewTeam from './tabs/CreteNewTeam';
import JoinNewTeam from './tabs/JoinNewTeam';
import TeamHistory from './tabs/TeamHistory';

export interface IndexTabsProps {
  teamId: string;
}

export default function IndexTabs(props: IndexTabsProps) {
  const [session] = useSession();
  const classes = useStyles();

  const [value, setValue] = React.useState(!session ? 1 : props.teamId ? 2 : 0);

  const handleChange = (_, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs className={classes.tabs} value={value} onChange={handleChange} variant="fullWidth" aria-label="index-tabs" centered>
          <Tab icon={<DashboardIcon />} label="Home" {...a11yProps(0)} />
          <Tab icon={<GroupIcon />} label="Eztimate" {...a11yProps(1)} disabled={!session} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <SignInOut />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography component="h1" variant="h5">
          Create or join your team
        </Typography>
        <CreateNewTeam />
        <Divider />
        <JoinNewTeam teamId={props.teamId} />
        <TeamHistory />
      </TabPanel>
    </div>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  tabs: {
    '& .MuiTab-root': {
      minWidth: 100
    }
  }
}));
