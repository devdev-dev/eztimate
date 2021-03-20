import { createStyles, Grid, makeStyles, Paper, Theme } from '@material-ui/core';
import React from 'react';
import EstimationPanelCard from './EstimationPanelCard';

const estimationValues = ['1', '2', '3', '5', '8', '13', '20', '40', '100'];

export default function EstimationPanel() {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.cards}>
      <Grid direction="row" justify="center" alignItems="stretch" container>
        {estimationValues.map((value, index) => (
          <Grid item xs={3} md={2} className={classes.cardsContent} key={index}>
            <EstimationPanelCard value={value} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cards: {
      backgroundColor: theme.palette.grey[100],
      marginBottom: theme.spacing(2)
    },
    cardsContent: {
      padding: theme.spacing(1)
    }
  })
);
