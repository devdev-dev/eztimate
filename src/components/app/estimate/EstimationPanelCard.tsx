import { Card, CardActionArea, CardContent, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';

export interface EstimationPanelCardProps {
  value: String;
}

export default function EstimationPanelCard({ value }: EstimationPanelCardProps) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.cardActionArea}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h4" color="textSecondary">
            {value}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      aspectRatio: '4 / 5'
    },
    cardActionArea: {
      height: '100%'
    },
    cardContent: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    }
  })
);
