import { Box, Card, CardActionArea, CardContent, createStyles, makeStyles, Theme, Tooltip, Typography } from '@material-ui/core';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import React from 'react';

export interface EstimationPanelCardProps {
  value: string | JSX.Element;
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

export interface EstimationPanelCardStackProps {
  count: number;
}

export function EstimationPanelCardStack({ count }: EstimationPanelCardStackProps) {
  const classes = useStyles();
  return (
    <Box className={classes.cardStack}>
      {new Array(count).fill(null).map((_, index) => (
        <Card key={index} raised={index === 0} className={classes.cardStackCard} style={{ left: index * -15 + 'px' }}>
          <PeopleOutlineIcon />
        </Card>
      ))}
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      aspectRatio: '4 / 5'
    },
    cardStack: {
      position: 'relative',
      aspectRatio: '4 / 5'
    },
    cardStackCard: {
      position: 'absolute',
      minWidth: '100%',
      minHeight: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
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
