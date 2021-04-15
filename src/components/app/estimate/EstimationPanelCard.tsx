import { Card, CardActionArea, CardContent, createStyles, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

export interface EstimationPanelCardProps {
  value: string;
  disabled?: boolean;
  raised?: boolean;
  onCardClick?: (value) => void;
}

export default function EstimationPanelCard({ value, disabled, raised, onCardClick }: EstimationPanelCardProps) {
  const classes = useStyles();

  return (
    <Card className={classes.card} raised={raised}>
      <CardActionArea className={classes.cardActionArea} onClick={() => onCardClick(value)} disabled={disabled}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h4" color="textSecondary">
            {value}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const useStyles = makeStyles(() =>
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
