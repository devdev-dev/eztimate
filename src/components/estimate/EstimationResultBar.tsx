import { Avatar, AvatarGroup, lighten } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import PersonIcon from '@material-ui/icons/Person';
import { keys, max, values } from 'lodash';
import * as React from 'react';
import { useMemo } from 'react';

export interface EstimationResultBarProps {
  estimates: Array<{ value: string; user: { _id: string } }>;
}

export function EstimationResultBar({ estimates }: EstimationResultBarProps) {
  const results = useMemo(() => {
    if (estimates) {
      return estimates.reduce<Record<string, string[]>>(function (acc, currentValue) {
        (acc[currentValue.value] = acc[currentValue.value] || []).push(currentValue.user._id);
        return acc;
      }, {});
    }
  }, [estimates]);

  const maxWeight = max(values(results).map(v => v.length)) ?? 0;

  return (
    <>
      {results &&
        keys(results).map((value, index) => {
          const users = results[value];
          const weight = users.length;

          return (
            <Box key={index} sx={{ flexGrow: weight }}>
              <Box
                sx={{
                  flexGrow: weight,
                  bgcolor: lighten('#334080', 1 - weight / maxWeight),
                  color: 'white',
                  textAlign: 'center'
                }}
              >
                {value}
              </Box>
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <AvatarGroup max={6}>
                  {users.map(userId => (
                    <Avatar key={userId}>
                      <PersonIcon />
                    </Avatar>
                  ))}
                </AvatarGroup>
              </Box>
            </Box>
          );
        })}
    </>
  );
}

export function EstimationResultBarHidden({ estimates }: EstimationResultBarProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          bgcolor: '#BBB'
        }}
      >
        &nbsp;
      </Box>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
        <AvatarGroup max={6}>
          {estimates.map(e => (
            <Avatar key={e.user._id}>
              <PersonIcon />
            </Avatar>
          ))}
        </AvatarGroup>
      </Box>
    </Box>
  );
}