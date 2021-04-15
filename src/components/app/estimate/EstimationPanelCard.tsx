import { Box, Card, CardActionArea, CardContent, createStyles, makeStyles, Theme, Tooltip, Typography } from '@material-ui/core';
import React from 'react';

export interface EstimationPanelCardProps {
  value: string;
  lable?: string;
  disabled?: boolean;
  raised?: boolean;
  onCardClick?: (value) => void;
}

export default function EstimationPanelCard({ value, lable, disabled, raised, onCardClick }: EstimationPanelCardProps) {
  const classes = useStyles();

  return (
    <Box>
      <Card className={classes.card} raised={raised}>
        <CardActionArea className={classes.cardActionArea} onClick={() => onCardClick(value)} disabled={disabled}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h5" color="textSecondary">
              {value}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {lable && (
        <Tooltip title={lable}>
          <Typography variant="subtitle2" color="textSecondary" className={classes.cardLabel}>
            {lable}
          </Typography>
        </Tooltip>
      )}
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      aspectRatio: '4 / 5',
      transition: 'transform 1s',
      transformStyle: 'preserve-3d'
    },
    cardActionArea: {
      height: '100%'
    },
    cardContent: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    },
    cardLabel: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(1),
      textAlign: 'center',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  })
);
