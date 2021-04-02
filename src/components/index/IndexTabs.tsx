import { AppBar, Box, Divider, makeStyles, Tab, Tabs, Theme, Typography } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import { useSession } from 'next-auth/client';
import React, { useEffect } from 'react';
import CreateNewTeam from './content/CreteNewTeam';
import JoinNewTeam from './content/JoinNewTeam';
import SignIn from './content/SignIn';
import TeamHistory from './content/TeamHistory';
import Copyright from './Copyright';

export interface IndexTabsProps {
  teamId: string;
}

export default function IndexTabs(props: IndexTabsProps) {
  const [session] = useSession();
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  useEffect(() => {
    setValue(!session ? 0 : 1);
  }, [session]);

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
        {!session && <SignIn />}
        <Box mt={5}>
          <Copyright />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <>
          <Typography component="h1" variant="h5">
            Create or join your team
          </Typography>
          <CreateNewTeam />
          <Divider />
          <JoinNewTeam teamId={props.teamId} />
          <TeamHistory />
        </>
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
