import { Avatar, Chip, createStyles, makeStyles, Theme } from '@material-ui/core';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import React from 'react';
import { useEstimateDeleteMutation } from '../../../apollo/types.grapqhl';

export interface ObfuscatableChipProps {
  estimate: any;
  obfuscated: boolean;
  deleteable: boolean;
  selected: boolean;
  onSelect: (value: String) => void;
}

export default function ObfuscatableChip({ estimate, obfuscated, deleteable, selected, onSelect }: ObfuscatableChipProps) {
  const classes = useStyles();

  const [estimateDelete] = useEstimateDeleteMutation();
  const handleDelete = () => {
    estimateDelete({
      variables: { id: estimate._id }
    });
  };

  return (
    <Chip
      variant={selected ? 'default' : 'outlined'}
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
      color="primary"
      className={classes.chip}
      clickable={!obfuscated}
      onClick={obfuscated ? undefined : () => onSelect(estimate.value)}
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
