import { Avatar, AvatarGroup, Box, BoxProps, lighten, styled } from '@mui/material';
import { keys, max, values } from 'lodash';
import * as React from 'react';
import { useMemo } from 'react';
import { User } from '../../generated/graphql';
import UserAvatar from '../UserAvatar';

type UserPropsInput = Pick<User, '_id' | 'name' | 'avatar'>;

export interface EstimationResultBarProps {
  estimates: Array<{ value: string; user: UserPropsInput }>;
  hideResults: boolean;
}

export function EstimationResultBar({ estimates, hideResults }: EstimationResultBarProps) {
  const noData = estimates?.length > 0;
  const showData = estimates && estimates.length > 0 && !hideResults;

  const results = useMemo(() => {
    if (!showData) {
      return { '\u00A0': estimates.map(e => e.user) };
    }
    return estimates.reduce<Record<string, UserPropsInput[]>>(function (acc, currentValue) {
      (acc[currentValue.value] = acc[currentValue.value] || []).push(currentValue.user);
      return acc;
    }, {});
  }, [estimates, showData]);

  const maxWeight = max(values(results).map(v => v.length)) ?? 0;

  return (
    <>
      {keys(results).map((value, index) => {
        const users: UserPropsInput[] = results[value];
        const weight = users.length;

        return (
          <Box key={index} sx={{ flexGrow: weight }}>
            <StyledResultBar weight={weight} maxWeight={maxWeight} disabled={!showData}>
              {value}
            </StyledResultBar>
            <AvatarGroup max={10} sx={{ p: 2, justifyContent: 'center', visibility: noData ? 'visible' : 'hidden' }}>
              {users.map(user => (
                <>
                  {showData && <UserAvatar key={user._id} user={user} />}
                  {!showData && <Avatar>?</Avatar>}
                </>
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
