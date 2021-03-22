import { Avatar, Chip, createStyles, makeStyles, Theme } from '@material-ui/core';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import React from 'react';
import { useEstimateDeleteMutation } from '../../apollo/types.grapqhl';

export interface ObfuscatableChipProps {
  estimate: any;
  obfuscated: boolean;
  deleteable: boolean;
}

export default function ObfuscatableChip({ estimate, obfuscated, deleteable }: ObfuscatableChipProps) {
  const classes = useStyles();

  const [estimateDelete] = useEstimateDeleteMutation();

  const handleDelete = () => {
    estimateDelete({
      variables: { id: estimate._id },
      update: (cache, { data }) => {
        cache.evict({ id: cache.identify({ id: data.estimateDelete._id, __typename: 'Estimate' }) });
        cache.gc();
      }
    });
  };

  return (
    <Chip
      variant="outlined"
      avatar={
        obfuscated ? (
          <Avatar>
            <BlurOnIcon />
          </Avatar>
        ) : (
          <Avatar>{estimate.value}</Avatar>
        )
      }
      label={estimate.user.email}
      clickable
      color="primary"
      className={classes.chip}
      onClick={() => {}}
      onDelete={deleteable ? handleDelete : undefined}
    />
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      margin: theme.spacing(0.5)
    }
  })
);
