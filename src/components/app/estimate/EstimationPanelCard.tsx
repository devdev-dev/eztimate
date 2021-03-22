import { Card, CardActionArea, CardContent, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { GetActiveTeamQuery, useEstimateCreateMutation } from '../../../apollo/types.grapqhl';

export interface EstimationPanelCardProps {
  value: String;
  issue: GetActiveTeamQuery['activeTeam']['issues'][0];
  raised: boolean;
}

export default function EstimationPanelCard({ value, issue, raised }: EstimationPanelCardProps) {
  const classes = useStyles();

  const [estimateCreate] = useEstimateCreateMutation();
  const handleClick = () => {
    estimateCreate({
      variables: { issueId: issue._id, value: `${value}` },
      update: (cache, { data: estimateCreated }) => {
        cache.modify({
          id: cache.identify(issue),
          fields: {
            estimates(cachedEstimates, { toReference }) {
              if (issue.estimates.find(e => e._id === estimateCreated.estimateCreate._id)) {
                return cachedEstimates;
              } else {
                return [...cachedEstimates, toReference(estimateCreated.estimateCreate)];
              }
            }
          }
        });
      }
    });
  };

  return (
    <Card className={classes.card} raised={raised}>
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
