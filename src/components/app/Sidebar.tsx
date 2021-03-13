import { Container, createStyles, IconButton, makeStyles, TextField, Theme, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import FlagIcon from '@material-ui/icons/Flag';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@material-ui/lab';
import React, { useContext, useRef } from 'react';
import { useMutation } from 'react-fetching-library';
import { AppContext } from '../../pages/app';
import { CreateIssueAction } from '../../utils/mongodb/mongodb.actions';
const Estimate = () => {
  const classes = useStyles();
  const context = useContext(AppContext);

  const { loading: createStoryLoading, mutate: mutateCreateIssue } = useMutation(CreateIssueAction);

  const textFieldRef = useRef<HTMLInputElement>(null);
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Typography variant="h6" component="h2" gutterBottom>
        {`Timeline of ${context.team?.name ?? ''}`}
      </Typography>

      <Timeline align="left" className={classes.timeline}>
        <TimelineItem>
          <TimelineOppositeContent className={classes.oppositeContent} />
          <TimelineSeparator>
            <TimelineDot color="primary">
              <FlagIcon />
            </TimelineDot>
            <TimelineConnector className={classes.secondaryTail} />
          </TimelineSeparator>
          <TimelineContent>This is the beginning of your estimation history! Create a new story to start estimating.</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent className={classes.oppositeContent} />
          <TimelineSeparator>
            <TimelineDot>
              <AddIcon />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            <TextField
              className={classes.createIssue}
              size="small"
              id="outlined-basic"
              variant="outlined"
              placeholder="Create a new issue"
              fullWidth={true}
              inputRef={textFieldRef}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => handleAddIssue(mutateCreateIssue, textFieldRef.current?.value)}>
                    <PlaylistAddIcon />
                  </IconButton>
                )
              }}
            />
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Container>
  );
};

function handleAddIssue(mutate, storyName: string) {
  mutate({
    storyName
  })
    .then(result => {
      console.log(result);
    })
    .catch(error => console.error(JSON.stringify(error)));
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(1)
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
    createIssue: {
      '& .MuiOutlinedInput-adornedEnd': {
        paddingRight: 0
      }
    }
  })
);

export default Estimate;
