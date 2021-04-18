import { Box, Card, CardActionArea, CardContent, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import React from 'react';
import { User } from '../../../apollo/types.grapqhl';
import UserAvatar from '../../shared/UserAvatar';

export interface EstimationPanelCardProps {
  value: string | React.ReactNode;
  user?: Pick<User, 'email' | 'username'>;
  avatar?: React.ReactNode;
  disabled?: boolean;
  raised?: boolean;
  onCardClick?: (value) => void;
}

export default function EstimationPanelCard({ value, user, avatar, disabled, raised, onCardClick }: EstimationPanelCardProps) {
  const classes = useStyles();

  return (
    <Card className={classes.card} raised={raised}>
      <CardActionArea className={classes.cardActionArea} onClick={() => onCardClick(value)} disabled={disabled}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" color="textSecondary">
            {value}
          </Typography>
          {user && <UserAvatar user={user} customAvatar={avatar} />}
        </CardContent>
      </CardActionArea>
    </Card>
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
      aspectRatio: '4 / 5',
      height: 120,
      margin: theme.spacing(1)
    },
    cardStack: {
      position: 'relative',
      aspectRatio: '4 / 5',
      height: 120,
      margin: theme.spacing(1)
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
      flexDirection: 'column-reverse',
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
