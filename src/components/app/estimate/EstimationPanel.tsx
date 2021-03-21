import { AppBar, createStyles, Grid, makeStyles, Paper, Tab, Theme } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import React from 'react';
import { useGetEstimatedIssueQuery } from '../../../apollo/types.grapqhl';
import EstimationPanelCard from './EstimationPanelCard';

const estimationValues = ['1', '2', '3', '5', '8', '13', '20', '40', '100'];

export default function EstimationPanel() {
  const classes = useStyles();

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  const { data } = useGetEstimatedIssueQuery();

  return (
    <Paper elevation={0} className={classes.cards}>
      <TabContext value={value}>
        <AppBar position="static">
          <TabList onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </AppBar>
        <TabPanel value="1">
          <Grid direction="row" justify="center" alignItems="stretch" container>
            {estimationValues.map((value, index) => (
              <Grid item xs={3} md={2} className={classes.cardsContent} key={index}>
                <EstimationPanelCard value={value} issue={data?.activeTeam?.estimatedIssue} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Paper>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cards: {
      flexGrow: 1,
      backgroundColor: theme.palette.grey[100],
      marginBottom: theme.spacing(2)
    },
    cardsContent: {
      padding: theme.spacing(1)
    }
  })
);
