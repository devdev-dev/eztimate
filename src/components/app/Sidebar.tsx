import { Box, createStyles, IconButton, makeStyles, Paper, TextField, Theme, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import FlagIcon from '@material-ui/icons/Flag';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@material-ui/lab';
import React, { useContext, useRef } from 'react';
import { useMutation, useQuery } from 'react-query';
import { AppContext } from '../../pages/app';
import { CreateIssueMutation, SetActiveIssuesMutation, IssueQuery } from '../../utils/mongodb/mongodb.actions';
import { IssueState } from '../../utils/types';

const Estimate = () => {
  const classes = useStyles();
  const context = useContext(AppContext);

  const issueQuery = useQuery('issues', IssueQuery);

  const activeIssueMutation = useMutation(SetActiveIssuesMutation);
  const createIssueMutation = useMutation(CreateIssueMutation, {
    onSuccess: async () => {
      issueQuery.refetch();
    }
  });

  const textFieldRef = useRef<HTMLInputElement>(null);
  const handleAddIssue = () => {
    createIssueMutation.mutate({
      issueName: textFieldRef.current?.value
    });
  };

  const handleSetActiveIssue = (issueId: string) => {
    activeIssueMutation.mutate({
      issueId
    });
  };

  return (
    <Box display="flex" flexDirection="column" className={classes.root}>
      <Box flexGrow={0} className={classes.header}>
        <Typography component="h2" variant="h5" gutterBottom>
          {`Timeline ${context.team?.name ? 'of ' + context.team?.name : ''}`}
        </Typography>
      </Box>
      <Box flexGrow={0} className={classes.buttons}>
        <TextField
          className={classes.createIssue}
          size="small"
          id="outlined-basic"
          variant="outlined"
          placeholder="Create a new issue"
          fullWidth={true}
          inputRef={textFieldRef}
          autoComplete="off"
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => handleAddIssue()}>
                <PlaylistAddIcon />
              </IconButton>
            )
          }}
        />
      </Box>
      <Box flexGrow={1} flexBasis={0} overflow={'auto'}>
        <Timeline align="left" className={classes.timeline}>
          {issueQuery.data?.map(issue => (
            <TimelineItem key={issue._id}>
              <TimelineOppositeContent className={classes.oppositeContent} />
              <TimelineSeparator>
                <TimelineDot color="primary" variant="outlined" className={classes.issueDot}>
                  {issue.state === IssueState.OPEN && <RadioButtonUncheckedIcon />}
                  {issue.state === IssueState.ESTIMATED && <CheckIcon />}
                  {issue.state === IssueState.UNFINISHED && <ErrorIcon />}
                </TimelineDot>
                <TimelineConnector className={classes.secondaryTail} />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={0} className={classes.timelineItemContent} onClick={e => handleSetActiveIssue(issue._id)}>
                  {issue.name}
                  {issue.estimate && <br />}
                  {issue.estimate && `Estimated Value was ${issue.estimate}`}
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
          <TimelineItem>
            <TimelineOppositeContent className={classes.oppositeContent} />
            <TimelineSeparator>
              <TimelineDot>
                <FlagIcon />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent>This is the beginning of your estimation history! Create a new story to start estimating.</TimelineContent>
          </TimelineItem>
        </Timeline>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      paddingLeft: theme.spacing(1)
    },
    header: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(2)
    },
    buttons: {
      paddingRight: theme.spacing(1),
      paddingBottom: theme.spacing(2)
    },
    timeline: {
      paddingLeft: 0,
      paddingRight: 0
    },
    oppositeContent: {
      flex: 0,
      padding: 0
    },
    secondaryTail: {
      backgroundColor: theme.palette.secondary.main
    },
    timelineItemContent: {
      padding: theme.spacing(1),
      cursor: 'pointer',
      '&:hover': {
        background: 'rgba(0,0,0,0.1)'
      }
    },
    issueDot: {
      borderColor: 'transparent'
    },
    createIssue: {
      '& .MuiOutlinedInput-adornedEnd': {
        paddingRight: 0
      }
    }
  })
);

export default Estimate;
