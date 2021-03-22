import { Box, createStyles, Grid, IconButton, makeStyles, Paper, Theme, Toolbar } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import React, { useEffect, useState } from 'react';
import { IssueState, useGetEstimatedIssueQuery, useIssueUpdateMutation } from '../../../apollo/types.grapqhl';
import EditableTextField from '../../shared/EditableTextField';
import ObfuscatableChip from '../../shared/ObfuscatableChip';
import EstimationPanelCard from './EstimationPanelCard';

const estimationValues = ['1', '2', '3', '5', '8', '13', '20', '40', '100'];

export default function EstimationPanel() {
  const classes = useStyles();

  const [obfuscated, setObfuscated] = useState(true);

  const { data } = useGetEstimatedIssueQuery();

  useEffect(() => {
    data && setObfuscated(data.activeTeam.estimatedIssue.state === IssueState.Open);
  }, [data]);

  const [issueUpdate] = useIssueUpdateMutation();
  const handleIssueUpdate = name => {
    issueUpdate({ variables: { id: data.activeTeam?.estimatedIssue?._id, name } });
  };
  const handleShowResults = () => {
    if (obfuscated) {
      setObfuscated(!obfuscated);
      issueUpdate({ variables: { id: data.activeTeam?.estimatedIssue?._id, state: IssueState.Discussed } });
    } else {
      setObfuscated(!obfuscated);
      issueUpdate({ variables: { id: data.activeTeam?.estimatedIssue?._id, state: IssueState.Open } });
    }
  };

  return (
    <Box>
      <Paper className={classes.results}>
        <Toolbar className={classes.resultsToolbar}>
          {data && <EditableTextField inputValue={data.activeTeam?.estimatedIssue?.name} onSave={name => handleIssueUpdate(name)} />}
          <IconButton edge="start" onClick={handleShowResults}>
            {obfuscated ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </Toolbar>
        <Box className={classes.resultsChips} px={2} pb={2}>
          {data?.activeTeam.estimatedIssue.estimates.map((estimate, index) => (
            <ObfuscatableChip key={index} estimate={estimate} obfuscated={obfuscated} />
          ))}
        </Box>
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
