import { Container } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import GroupIcon from '@material-ui/icons/Group';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useSession } from 'next-auth/client';
import React from 'react';
import CreateNewTeam from './create/CreteNewTeam';
import JoinNewTeam from './join/JoinNewTeam';
import TeamHistory from './join/TeamHistory';
import SignInOut from './SignInOut';
export interface IndexTabsProps {
  teamId: string;
}

export default function IndexTabs(props: IndexTabsProps) {
  const [session, loading] = useSession();
  const classes = useStyles();
  const theme = useTheme();

  const [value, setValue] = React.useState(!session ? 2 : props.teamId ? 1 : 0);

  const handleChange = (_, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs className={classes.tabs} value={value} onChange={handleChange} variant="fullWidth" aria-label="index-tabs" centered>
          <Tab icon={<GroupIcon />} label="Create Team" {...a11yProps(0)} disabled={!session} />
          <Tab icon={<GroupAddIcon />} label="Join Team" {...a11yProps(1)} disabled={!session} />
          <Tab icon={session ? <LockOpenIcon /> : <LockIcon />} label="Profile" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Container className={classes.joinTab}>
          <CreateNewTeam />
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Container className={classes.joinTab}>
          <JoinNewTeam teamId={props.teamId} />
          <TeamHistory />
        </Container>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Container className={classes.joinTab}>
          <SignInOut />
        </Container>
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
  },
  joinTab: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));
