import { usePresenceChannel } from '@harelpls/use-pusher';
import { Box, Button, createStyles, makeStyles, Menu, MenuItem, Paper, Theme, Toolbar, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { Skeleton } from '@material-ui/lab';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  IssueState,
  IssueUpdateMutationVariables,
  useEstimateCreateMutation,
  useGetEstimatedIssueQuery,
  useIssueUpdateMutation,
  useLoggedInUserQuery
} from '../../../apollo/types.grapqhl';
import { AppContext } from '../../../pages/app';
import { useEstimateCreateEvent, useEstimateDeleteEvent } from '../../../utils/hooks';
import EditableTextField from './EditableTextField';
import EstimationPanelCard, { EstimationPanelCardStack } from './EstimationPanelCard';

const estimationValues = ['Small', 'Medium', 'Large'];
const MENU_ITEM_HEIGHT = 48;

export default function EstimationPanel() {
  const classes = useStyles();

  const { data: loggedInUser } = useLoggedInUserQuery();
  const { data: issueQuery, loading: loadingIssueQuery } = useGetEstimatedIssueQuery();

  const [issueUpdate] = useIssueUpdateMutation({ ignoreResults: true });
  const [estimateCreate] = useEstimateCreateMutation();

  const [finishMenuOpen, setFinishMenuOpen] = useState(false);
  const [issueUnderEstimation, setIssueUnderEstimation] = useState(null);
  const [obfuscated, setObfuscated] = useState(true);
  const [finished, setFinished] = useState(false);

  const { teamId } = useContext(AppContext);
  const { channel } = usePresenceChannel(`presence-${teamId}`);
  useEstimateCreateEvent(issueUnderEstimation);
  useEstimateDeleteEvent();

  useEffect(() => {
    setIssueUnderEstimation(issueQuery?.activeTeam.estimatedIssue);
    const state = issueQuery?.activeTeam.estimatedIssue?.state;
    setObfuscated(state === IssueState.Open || state === IssueState.Reestimate);
    setFinished(state === IssueState.Estimated);
  }, [issueQuery]);

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

  const handleEstimationFinished = (value: string) => {
    issueUpdate({ variables: { id: issueUnderEstimation?._id, state: IssueState.Estimated, estimate: value } }).then(() => setFinishMenuOpen(false));
  };

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

  const finishButtonRef = useRef<HTMLButtonElement>(null);

  const EstimationToolbar = (
    <Toolbar className={classes.resultsToolbar}>
      <EditableTextField inputValue={issueUnderEstimation?.name} onSave={name => handleIssueUpdate(name)} />
      {obfuscated && (
        <Button variant="contained" color="primary" onClick={handleShowResults}>
          Reveal
        </Button>
      )}
      {!obfuscated && !finished && (
        <>
          <Button variant="text" color="secondary" onClick={handleShowResults}>
            Restimate
          </Button>
          <Button variant="contained" color="primary" onClick={() => setFinishMenuOpen(true)} ref={finishButtonRef}>
            Finish
          </Button>
          <Menu
            anchorEl={finishButtonRef.current}
            open={finishMenuOpen}
            onClose={() => setFinishMenuOpen(false)}
            PaperProps={{
              style: {
                maxHeight: MENU_ITEM_HEIGHT * 4.5,
                width: '20ch'
              }
            }}
            keepMounted
          >
            {estimationValues.map((value, index) => (
              <MenuItem key={index} onClick={() => handleEstimationFinished(value)}>
                {value}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
      {finished && (
        <Button disabled={true} variant="outlined" color="secondary" onClick={handleShowResults}>
          Final Estimation: {issueUnderEstimation?.estimate}
        </Button>
      )}
    </Toolbar>
  );

  let remainingEstimates = 1;
  if (channel?.members?.count && issueUnderEstimation) {
    remainingEstimates = channel?.members?.count - issueUnderEstimation.estimates.length;
  }

  return (
    <Box>
      <Paper className={classes.results}>
        {issueUnderEstimation && !loadingIssueQuery ? EstimationToolbar : EmptyToolbar}
        <Box className={classes.cardwrap}>
          {remainingEstimates > 0 && <EstimationPanelCardStack count={remainingEstimates} />}
          {issueUnderEstimation?.estimates.map((estimate, index) => (
            <EstimationPanelCard key={index} value={obfuscated ? <CheckIcon /> : estimate.value} disabled={true} />
          ))}
        </Box>
      </Paper>
      <Paper elevation={0} className={classes.cards}>
        <Box className={classes.cardwrap}>
          {estimationValues.map((value, index) => (
            <EstimationPanelCard
              key={index}
              value={value}
              disabled={!issueUnderEstimation || loadingIssueQuery || finished}
              raised={userEstimate?.value === value}
              onCardClick={handleCardClick}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardwrap: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    results: {
      margin: theme.spacing(2),
      marginTop: 0,
      position: 'relative',
      zIndex: 200
    },
    resultsToolbar: {},
    resultsChips: {},
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
