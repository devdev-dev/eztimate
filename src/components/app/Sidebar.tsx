import { Box, createStyles, IconButton, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import FlagIcon from '@material-ui/icons/Flag';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@material-ui/lab';
import React, { useContext, useRef } from 'react';
import { useMutation, useQuery } from 'react-fetching-library';
import { AppContext } from '../../pages/app';
import { CreateIssueAction, FetchIssuesAction } from '../../utils/mongodb/mongodb.actions';
import { IssueState, UIssues } from '../../utils/types';
const Estimate = () => {
  const classes = useStyles();
  const context = useContext(AppContext);

  const { loading: issuesLoading, payload: issues, query: queryIssues } = useQuery<UIssues[]>(FetchIssuesAction);
  const { loading: createIssueLoading, mutate: mutateCreateIssue } = useMutation(CreateIssueAction);

  const textFieldRef = useRef<HTMLInputElement>(null);

  const handleAddIssue = () => {
    mutateCreateIssue({
      issueName: textFieldRef.current?.value
    })
      .then(result => {
        queryIssues();
      })
      .catch(error => console.error(JSON.stringify(error)));
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
          {issues?.map(issue => (
            <TimelineItem key={issue.id}>
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
                {issue.name}
                {issue.estimate && <br />}
                {issue.estimate && `Estimated Value was ${issue.estimate}`}
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
