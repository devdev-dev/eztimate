import { Container, createStyles, IconButton, makeStyles, TextField, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import FlagIcon from '@material-ui/icons/Flag';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@material-ui/lab';
import React, { useContext } from 'react';
import { AppContext } from '../../pages/app';
const Estimate = () => {
  const classes = useStyles();
  const context = useContext(AppContext);
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
              className={classes.createStory}
              size="small"
              id="outlined-basic"
              variant="outlined"
              placeholder="Create a new story"
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <IconButton>
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
    createStory: {
      '& .MuiOutlinedInput-adornedEnd': {
        paddingRight: 0
      }
    }
  })
);

export default Estimate;
