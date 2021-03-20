import { createStyles, Grid, makeStyles, Paper, Theme } from '@material-ui/core';
import React from 'react';
import { useGetEstimatedIssueQuery } from '../../../apollo/types.grapqhl';
import EditableTextField from '../../shared/EditableTextField';

export default function IssuePanel() {
  const classes = useStyles();

  const { data } = useGetEstimatedIssueQuery();

  const handleIssueSave = () => {};

  return (
    <Paper elevation={3} className={classes.story}>
      {data && (
        <Grid container>
          <Grid item md={10} className={classes.storyContent}>
            <EditableTextField inputValue={data.activeTeam.estimatedIssue?.name} />
          </Grid>
          <Grid item md={2} className={classes.storyContent}>
            Some Controls here
          </Grid>
        </Grid>
      )}
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
