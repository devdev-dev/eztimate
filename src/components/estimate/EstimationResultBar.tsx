import PersonIcon from '@mui/icons-material/Person';
import { Avatar, AvatarGroup, Box, BoxProps, lighten, styled } from '@mui/material';
import { keys, max, values } from 'lodash';
import * as React from 'react';
import { useMemo } from 'react';
import theme from '../../theme';

export interface EstimationResultBarProps {
  estimates: Array<{ value: string; user: { _id: string } }>;
  hideResults: boolean;
}

export function EstimationResultBar({ estimates, hideResults }: EstimationResultBarProps) {
  const noData = estimates?.length > 0;
  const showData = estimates && estimates.length > 0 && !hideResults;

  const results = useMemo(() => {
    if (showData) {
      return estimates.reduce<Record<string, string[]>>(function (acc, currentValue) {
        (acc[currentValue.value] = acc[currentValue.value] || []).push(currentValue.user._id);
        return acc;
      }, {});
    }

    return { '\u00A0': [''] };
  }, [estimates, showData]);

  const maxWeight = max(values(results).map(v => v.length)) ?? 0;
  const barColor = showData ? theme.palette.primary.main : theme.palette.grey['400'];

  return (
    <>
      {keys(results).map((value, index) => {
        const users = results[value];
        const weight = users.length;

        return (
          <Box key={index} sx={{ flexGrow: weight }}>
            <StyledResultBar weight={weight} maxWeight={maxWeight} disabled={!showData}>
              {value}
            </StyledResultBar>
            <AvatarGroup sx={{ p: 2, justifyContent: 'center', visibility: noData ? 'visible' : 'hidden' }}>
              {users.map(userId => (
                <Avatar key={userId} sx={{}}>
                  <PersonIcon />
                </Avatar>
              ))}
            </AvatarGroup>
          </Box>
        );
      })}
    </>
  );
}

interface StyledResultBarProps {
  weight: number;
  maxWeight: number;
  disabled: boolean;
}

const StyledResultBar = styled((props: StyledResultBarProps & BoxProps) => <Box {...props} />)(({ theme, weight, maxWeight, disabled }) => ({
  flexGrow: weight,
  backgroundColor: lighten(disabled ? theme.palette.grey['400'] : theme.palette.primary.main, 1 - weight / maxWeight),
  color: 'white',
  textAlign: 'center',
  marginInline: theme.spacing(1)
}));