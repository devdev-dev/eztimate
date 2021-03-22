import { Avatar, Chip, createStyles, makeStyles, Theme } from '@material-ui/core';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import React from 'react';
import { useEstimateDeleteMutation, useLoggedInUserQuery } from '../../apollo/types.grapqhl';

export interface ObfuscatableChipProps {
  estimate: any;
  obfuscated: boolean;
}

export default function ObfuscatableChip({ estimate, obfuscated }: ObfuscatableChipProps) {
  const classes = useStyles();

  const { data } = useLoggedInUserQuery();
  const [estimateIssue] = useEstimateDeleteMutation();

  const handleDelete = () => {
    estimateIssue({
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
      onDelete={data?.loggedInUser._id === estimate.user._id ? handleDelete : undefined}
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
