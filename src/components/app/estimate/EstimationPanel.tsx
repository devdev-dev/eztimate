import { Badge, Box, Button, createStyles, Grid, IconButton, makeStyles, Paper, Theme, Toolbar, Typography } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { Skeleton } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import {
  IssueState,
  IssueUpdateMutationVariables,
  useEstimateCreateMutation,
  useGetEstimatedIssueQuery,
  useIssueUpdateMutation,
  useLoggedInUserQuery
} from '../../../apollo/types.grapqhl';
import { useEstimateCreateEvent, useEstimateDeleteEvent } from '../../../utils/hooks';
import EditableTextField from './EditableTextField';
import EstimationPanelCard from './EstimationPanelCard';

const estimationValues = ['Small', 'Medium', 'Large'];

export default function EstimationPanel() {
  const classes = useStyles();

  const { data: loggedInUser } = useLoggedInUserQuery();
  const { data: issueQuery, loading: loadingIssueQuery } = useGetEstimatedIssueQuery();

  const [issueUnderEstimation, setIssueUnderEstimation] = useState(null);
  useEffect(() => {
    setIssueUnderEstimation(issueQuery?.activeTeam.estimatedIssue);
  }, [issueQuery]);
  useEstimateCreateEvent(issueUnderEstimation);
  useEstimateDeleteEvent();

  const [obfuscated, setObfuscated] = useState(true);
  useEffect(() => {
    const state = issueQuery?.activeTeam.estimatedIssue?.state;
    setObfuscated(state === IssueState.Open || state === IssueState.Reestimate);
  }, [issueQuery]);

  const [issueUpdate] = useIssueUpdateMutation({ ignoreResults: true });
  const handleIssueUpdate = name => {
    issueUpdate({ variables: { id: issueUnderEstimation?._id, name } });
  };
  const handleShowResults = () => {
    let variables: IssueUpdateMutationVariables = { id: issueUnderEstimation?._id };
    if (obfuscated) {
      variables = { ...variables, state: IssueState.Discussed };
    } else {
      variables = { ...variables, state: IssueState.Reestimate, estimate: null };
    }
    issueUpdate({ variables }).then(() => setObfuscated(!obfuscated));
  };
  const handleEstimationSelect = estimateValue => {
    if (issueUnderEstimation?.estimate === estimateValue) {
      issueUpdate({ variables: { id: issueUnderEstimation?._id, estimate: null } });
    } else {
      issueUpdate({ variables: { id: issueUnderEstimation?._id, estimate: estimateValue } });
    }
  };
  const handleEstimationFinished = () => {
    issueUpdate({ variables: { id: issueUnderEstimation?._id, state: IssueState.Estimated } });
  };

  const [estimateCreate] = useEstimateCreateMutation();
  const handleCardClick = value => {
    estimateCreate({
      variables: { issueId: issueUnderEstimation._id, value: `${value}` }
    });
  };

  const userEstimate = issueUnderEstimation?.estimates.find(e => e.user._id === loggedInUser?.loggedInUser._id);

  const EmptyToolbar = (
    <Toolbar className={classes.resultsToolbar}>
      {loadingIssueQuery ? <Skeleton animation="wave" width="100%" height="50px" /> : <Typography variant="h5">Choose an issue to start estimation</Typography>}
    </Toolbar>
  );

  const EstimationToolbar = (
    <Toolbar className={classes.resultsToolbar}>
      <EditableTextField inputValue={issueUnderEstimation?.name} onSave={name => handleIssueUpdate(name)} />
      <Button variant="text" color="secondary" onClick={handleShowResults}>
        {obfuscated ? 'Show Results' : 'Hide Results'}
      </Button>
      <IconButton edge="end" disabled={obfuscated} onClick={handleEstimationFinished}>
        <Badge
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          badgeContent={issueUnderEstimation?.estimate ?? 0}
          color="secondary"
        >
          <SendIcon />
        </Badge>
      </IconButton>
    </Toolbar>
  );

  return (
    <Box>
      <Paper className={classes.results}>
        {issueUnderEstimation && !loadingIssueQuery ? EstimationToolbar : EmptyToolbar}
        <Box className={classes.resultsChips} px={2} pb={2}>
          {issueUnderEstimation?.estimates.map((estimate, index) => (
            <Grid item xs={3} md={2} className={classes.cardsContent} key={index}>
              <EstimationPanelCard
                value={obfuscated ? '?' : estimate.value}
                lable={obfuscated ? '?' : estimate.user.email}
                disabled={true}
                onCardClick={handleEstimationSelect}
              />
            </Grid>
          ))}
        </Box>
      </Paper>
      <Paper elevation={0} className={classes.cards}>
        <Grid direction="row" justify="center" alignItems="stretch" container>
          {estimationValues.map((value, index) => (
            <Grid item xs={3} md={2} className={classes.cardsContent} key={index}>
              <EstimationPanelCard
                value={value}
                disabled={!issueUnderEstimation || loadingIssueQuery}
                raised={userEstimate?.value === value}
                onCardClick={handleCardClick}
              />
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
      marginTop: 0,
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
