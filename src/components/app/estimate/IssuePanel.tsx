import { createStyles, Grid, Link, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import React from 'react';

export default function IssuePanel() {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.story}>
      <Grid container>
        <Grid item md={10} className={classes.storyContent}>
          <Typography variant="h5" color="inherit" gutterBottom>
            Name of the story
          </Typography>
          <Typography variant="body2" color="inherit" gutterBottom>
            Description of the story
          </Typography>
          <Link variant="subtitle1" href="#">
            Link to Jira
          </Link>
        </Grid>
        <Grid item md={2} className={classes.storyContent}>
          Some Controls here
        </Grid>
      </Grid>
    </Paper>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(2)
    },
    story: {
      marginBottom: theme.spacing(2)
    },
    storyContent: {
      padding: theme.spacing(1)
    },
    avatars: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    inviteButton: {},
    speedDial: {
      position: 'absolute',
      '& button': {
        zIndex: 1052
      },
      '& .MuiSpeedDial-actions': {
        position: 'absolute',
        margin: 0,
        zIndex: 1051,
        '&.MuiSpeedDial-actionsClosed': {}
      }
    }
  })
);
