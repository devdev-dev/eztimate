import { Avatar, Box, Chip, createStyles, Grid, IconButton, makeStyles, Paper, Theme, Toolbar } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import React, { useState } from 'react';
import { useGetEstimatedIssueQuery, useIssueUpdateMutation } from '../../../apollo/types.grapqhl';
import EditableTextField from '../../shared/EditableTextField';
import EstimationPanelCard from './EstimationPanelCard';

const estimationValues = ['1', '2', '3', '5', '8', '13', '20', '40', '100'];

export default function EstimationPanel() {
  const classes = useStyles();

  const [resultVisible, setResultVisible] = useState(false);

  const { data } = useGetEstimatedIssueQuery();

  const [issueUpdate] = useIssueUpdateMutation();
  const handleIssueUpdate = (id, name) => {
    issueUpdate({ variables: { id, name } });
  };

  return (
    <Box>
      <Paper className={classes.results}>
        <Toolbar className={classes.resultsToolbar}>
          {data && (
            <EditableTextField
              inputValue={data.activeTeam?.estimatedIssue?.name}
              onSave={name => handleIssueUpdate(data.activeTeam?.estimatedIssue?._id, name)}
            />
          )}
          <IconButton edge="start" onClick={() => setResultVisible(!resultVisible)}>
            {resultVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </Toolbar>
        {resultVisible && (
          <Box className={classes.resultsChips} px={2} pb={2}>
            {data.activeTeam.estimatedIssue.estimates.map((estimate, index) => (
              <Chip
                key={index}
                variant="outlined"
                avatar={<Avatar>{estimate.value}</Avatar>}
                label={estimate.user.email}
                clickable
                color="primary"
                className={classes.chip}
              />
            ))}
          </Box>
        )}
      </Paper>
      <Paper elevation={0} className={classes.cards}>
        <Grid direction="row" justify="center" alignItems="stretch" container>
          {estimationValues.map((value, index) => (
            <Grid item xs={3} md={2} className={classes.cardsContent} key={index}>
              <EstimationPanelCard value={value} issue={data?.activeTeam?.estimatedIssue} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    results: {
      margin: theme.spacing(2),
      position: 'relative',
      zIndex: 200
    },
    resultsToolbar: {},
    resultsChips: {},
    title: {
      flexGrow: 1
    },
    chip: {
      margin: theme.spacing(0.5)
    },
    cards: {
      width: '100%',
      backgroundColor: theme.palette.grey[100],
      marginBottom: theme.spacing(2),
      position: 'relative',
      zIndex: 100,
      marginTop: `-${theme.spacing(7)}px`,
      paddingTop: theme.spacing(7)
    },
    cardsContent: {
      padding: theme.spacing(1)
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1)
    }
  })
);
