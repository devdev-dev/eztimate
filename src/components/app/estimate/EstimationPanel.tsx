import { Badge, Box, Button, createStyles, Grid, IconButton, makeStyles, Paper, Theme, Toolbar, withStyles } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import React, { useEffect, useState } from 'react';
import { IssueState, useGetEstimatedIssueQuery, useIssueUpdateMutation, useLoggedInUserQuery } from '../../../apollo/types.grapqhl';
import EditableTextField from '../../shared/EditableTextField';
import ObfuscatableChip from '../../shared/ObfuscatableChip';
import EstimationPanelCard from './EstimationPanelCard';

const estimationValues = ['1', '2', '3', '5', '8', '13', '20', '40', '100'];

export default function EstimationPanel() {
  const classes = useStyles();

  const [obfuscated, setObfuscated] = useState(true);

  const { data: loggedInUser } = useLoggedInUserQuery();
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
      issueUpdate({ variables: { id: data.activeTeam?.estimatedIssue?._id, state: IssueState.Open, estimate: null } });
    }
  };
  const handleEstimationSelect = estimateValue => {
    if (data.activeTeam?.estimatedIssue?.estimate === estimateValue) {
      issueUpdate({ variables: { id: data.activeTeam?.estimatedIssue?._id, estimate: null } });
    } else {
      issueUpdate({ variables: { id: data.activeTeam?.estimatedIssue?._id, estimate: estimateValue } });
    }
  };

  const userEstimate = data?.activeTeam.estimatedIssue.estimates.find(e => e.user._id === loggedInUser?.loggedInUser._id);

  return (
    <Box>
      <Paper className={classes.results}>
        <Toolbar className={classes.resultsToolbar}>
          {data && <EditableTextField inputValue={data.activeTeam?.estimatedIssue?.name} onSave={name => handleIssueUpdate(name)} />}
          <Button variant="text" color="secondary" onClick={handleShowResults} endIcon={obfuscated ? <VisibilityIcon /> : <VisibilityOffIcon />}>
            {obfuscated ? 'Show Results' : 'Hide Results'}
          </Button>
          <IconButton edge="end" disabled={obfuscated}>
            <Badge
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              badgeContent={data?.activeTeam.estimatedIssue.estimate ?? 0}
              color="secondary"
            >
              <SendIcon />
            </Badge>
          </IconButton>
        </Toolbar>
        <Box className={classes.resultsChips} px={2} pb={2}>
          {data?.activeTeam.estimatedIssue.estimates.map((estimate, index) => (
            <ObfuscatableChip
              key={index}
              estimate={estimate}
              obfuscated={obfuscated}
              deleteable={userEstimate?._id === estimate._id}
              selected={data?.activeTeam?.estimatedIssue?.estimate === estimate.value}
              onSelect={handleEstimationSelect}
            />
          ))}
        </Box>
      </Paper>
      <Paper elevation={0} className={classes.cards}>
        <Grid direction="row" justify="center" alignItems="stretch" container>
          {estimationValues.map((value, index) => (
            <Grid item xs={3} md={2} className={classes.cardsContent} key={index}>
              <EstimationPanelCard value={value} issue={data?.activeTeam?.estimatedIssue} raised={userEstimate?.value === value} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      left: 3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px'
    }
  })
)(Badge);

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
