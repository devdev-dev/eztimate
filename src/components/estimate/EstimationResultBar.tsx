import { Avatar, lighten, Tooltip } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import PersonIcon from '@material-ui/icons/Person';
import { keys, max, values } from 'lodash';
import * as React from 'react';
import { useMemo } from 'react';

export interface EstimationResultBarProps {
  estimates: Array<{ value: string; user: { _id: string } }>;
}

export default function EstimationResultBar({ estimates }: EstimationResultBarProps) {
  const results = useMemo(() => {
    return estimates.reduce<Record<string, string[]>>(function (acc, currentValue) {
      (acc[currentValue.value] = acc[currentValue.value] || []).push(currentValue.user._id);
      return acc;
    }, {});
  }, [estimates]);

  const maxWeight = max(values(results).map(v => v.length)) ?? 0;

  return (
    <Box sx={{ width: '100%' }}>
      {(!results || keys(results).length === 0) && (
        <Box
          sx={{
            width: '100%',
            bgcolor: '#BBB'
          }}
        >
          &nbsp;
        </Box>
      )}
      {results &&
        keys(results).map((value, index) => {
          const users = results[value];
          const weight = users.length;
          return (
            <div key={index}>
              <Box
                sx={{
                  flexGrow: weight,
                  bgcolor: lighten('#556cd6', 1 - weight / maxWeight),
                  color: 'white',
                  border: 1,
                  textAlign: 'center'
                }}
              >
                {value}
              </Box>
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                {users.map(userId => (
                  <Box key={userId} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title={userId}>
                      <Avatar variant="rounded" sx={{ mx: 1, my: 1 }}>
                        <PersonIcon />
                      </Avatar>
                    </Tooltip>
                  </Box>
                ))}
              </Box>
            </div>
          );
        })}
    </Box>
  );
}
