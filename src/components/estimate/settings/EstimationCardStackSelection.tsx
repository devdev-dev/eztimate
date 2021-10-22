import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import { Estimate, User, useUpdateActiveIssueMutation, useUpdateActiveUserMutation } from '../../../generated/graphql';
import UploadAvatar from '../../layout/activeuser/UploadAvatar';
import UserInformation from '../../layout/activeuser/UserInformation';

export interface EstimationCardStackSelectionProps {
  stack: string[];
}

export default function EstimationCardStackSelection({ stack }: EstimationCardStackSelectionProps) {
  const [updateActiveIssue] = useUpdateActiveIssueMutation();

  const [selectedStackId, setSelectedStackId] = React.useState(getStackId(stack));
  const [customStack, setCustomStack] = React.useState<string[]>(stack ?? []);

  return (
    <Grid container sx={{ p: 1 }}>
      <Grid item xs={12} sm="auto">
        <TextField
          fullWidth
          label="Card Stack"
          autoComplete="off"
          onChange={e => {
            setSelectedStackId(CUSTOM_STACK_ID);
            setCustomStack(e.target.value.replaceAll(' ', '').split(','));
          }}
          onBlur={e => {
            updateActiveIssue({ variables: { input: { stack: customStack } } });
          }}
          value={customStack.join(',')}
        />
      </Grid>
      <Grid item xs={12} sm>
        <FormControl fullWidth sx={{ ml: 1, minWidth: 150 }}>
          <InputLabel>Card Stack Templates</InputLabel>
          <Select
            value={selectedStackId}
            label="Card Stack Templates"
            onChange={e => {
              setSelectedStackId(e.target.value);
              const values = DEFAULT_CARD_STACKS.find(s => s.id === e.target.value)?.values ?? [];
              setCustomStack(values);
              updateActiveIssue({ variables: { input: { stack: values } } });
            }}
          >
            {DEFAULT_CARD_STACKS.map(stack => (
              <MenuItem key={stack.id} value={stack.id}>
                {stack.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

function getStackId(stack: string[] | undefined) {
  if (!stack) {
    return '';
  } else {
    const defaultStackId = DEFAULT_CARD_STACKS.find(s => {
      return s.values.length === stack.length && s.values.every((val, index) => val === stack[index]);
    })?.id;
    return defaultStackId ?? CUSTOM_STACK_ID;
  }
}

const CUSTOM_STACK_ID = 'customstack';
const DEFAULT_CARD_STACKS = [
  {
    id: 'simpledescriptive',
    name: 'Simple Descriptive',
    values: ['Small', 'Medium', 'Large']
  },
  {
    id: 'scrumfibonacci',
    name: 'Scrum Fibonacci',
    values: ['0', '½', '1', '2', '3', '5', '8', '13']
  },
  {
    id: 'realfibonacci',
    name: 'Real Fibonacci',
    values: ['0', '1', '2', '3', '5', '8', '13', '21']
  },
  {
    id: 'thepoweroftwo',
    name: 'The Power of Two',
    values: ['0', '2', '4', '8', '16', '32']
  },
  {
    id: 'tshirtsizes',
    name: 'T-Shirt Sizes',
    values: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: CUSTOM_STACK_ID,
    name: 'Custom Stack',
    values: []
  }
];
