import { Container, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@material-ui/lab';
import React, { useContext } from 'react';
import { AppContext } from '../../pages/app';

const Estimate = () => {
  const classes = useStyles();
  const context = useContext(AppContext);
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Typography variant="h6" component="h2" gutterBottom>
        {`Timeline of ${context.team.name}`}
      </Typography>

      <Timeline align="left">
        <TimelineItem>
          <TimelineOppositeContent className={classes.oppositeContent} />
          <TimelineSeparator>
            <TimelineDot color="primary" variant="outlined" />
            <TimelineConnector className={classes.secondaryTail} />
          </TimelineSeparator>
          <TimelineContent>Story 1</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent className={classes.oppositeContent} />
          <TimelineSeparator>
            <TimelineDot color="primary" variant="outlined" />
            <TimelineConnector className={classes.secondaryTail} />
          </TimelineSeparator>
          <TimelineContent>Story 2</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent className={classes.oppositeContent} />
          <TimelineSeparator>
            <TimelineDot color="primary" variant="default" />
            <TimelineConnector className={classes.secondaryTail} />
          </TimelineSeparator>
          <TimelineContent>Story 3</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent className={classes.oppositeContent} />
          <TimelineSeparator>
            <TimelineDot color="primary" variant="outlined" />
          </TimelineSeparator>
          <TimelineContent>Click to create a new story</TimelineContent>
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
    oppositeContent: {
      flex: 0,
      padding: 0
    },
    secondaryTail: {
      backgroundColor: theme.palette.secondary.main
    }
  })
);

export default Estimate;
