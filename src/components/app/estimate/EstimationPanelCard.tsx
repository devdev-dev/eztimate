import { Card, CardActionArea, CardContent, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { GetActiveTeamQuery, useEstimateIssueMutation } from '../../../apollo/types.grapqhl';

export interface EstimationPanelCardProps {
  value: String;
  issue: GetActiveTeamQuery['activeTeam']['issues'][0];
}

export default function EstimationPanelCard({ value, issue }: EstimationPanelCardProps) {
  const classes = useStyles();

  const [estimateIssue] = useEstimateIssueMutation();
  const handleClick = () => {
    estimateIssue({ variables: { issueId: issue._id, value: `${value}` } });
  };

  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.cardActionArea} onClick={handleClick}>
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
