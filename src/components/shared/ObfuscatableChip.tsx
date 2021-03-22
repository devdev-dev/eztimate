import { Avatar, Chip, createStyles, makeStyles, Theme } from '@material-ui/core';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import React from 'react';

export interface ObfuscatableChipProps {
  estimate: any;
  obfuscated: boolean;
}

export default function ObfuscatableChip({ estimate, obfuscated }: ObfuscatableChipProps) {
  const classes = useStyles();

  const avatar = obfuscated ? (
    <Avatar>
      <BlurOnIcon />
    </Avatar>
  ) : (
    <Avatar>{estimate.value}</Avatar>
  );

  return <Chip variant="outlined" avatar={avatar} label={estimate.user.email} clickable color="primary" className={classes.chip} />;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      margin: theme.spacing(0.5)
    }
  })
);
