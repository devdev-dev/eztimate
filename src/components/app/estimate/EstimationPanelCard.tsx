import { Card, CardActionArea, CardContent, createStyles, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { GetActiveTeamQuery, useEstimateCreateMutation } from '../../../apollo/types.grapqhl';

export interface EstimationPanelCardProps {
  value: String;
  issue: GetActiveTeamQuery['activeTeam']['issues'][0];
  disabled: boolean;
  raised: boolean;
}

export default function EstimationPanelCard({ value, issue, disabled, raised }: EstimationPanelCardProps) {
  const classes = useStyles();

  const [estimateCreate] = useEstimateCreateMutation();
  const handleClick = () => {
    estimateCreate({
      variables: { issueId: issue._id, value: `${value}` }
    });
  };

  return (
    <Card className={classes.card} raised={raised}>
      <CardActionArea className={classes.cardActionArea} onClick={handleClick} disabled={disabled}>
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
