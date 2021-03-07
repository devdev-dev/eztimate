import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import LaunchIcon from '@material-ui/icons/Launch';
import React from 'react';
import CreateTeamTabContent from './CreateTeamTabContent';
import JoinTeamTabContent from './JoinTeamTabContent';

export interface IndexTabsProps {
  teamId: string;
}

export default function IndexTabs(props: IndexTabsProps) {
  const classes = useStyles();
  const theme = useTheme();

  const [value, setValue] = React.useState(props.teamId ? 1 : 0);

  const handleChange = (_, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="index-tabs">
          <Tab icon={<LaunchIcon />} label="Create a new Team" {...a11yProps(0)} />
          <Tab icon={<GroupAddIcon />} label="Join your team" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <CreateTeamTabContent />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <JoinTeamTabContent teamId={props.teamId} />
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
  settingsTab: {
    width: '32px'
  }
}));
