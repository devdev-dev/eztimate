import { css } from '@emotion/css';
import { Avatar, lighten, Tooltip } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import PersonIcon from '@material-ui/icons/Person';
import { keys, max, values } from 'lodash';
import * as React from 'react';
import { useMemo } from 'react';
import { useActiveEstimateQuery } from '../../generated/graphql';

export default function EstimationResults() {
  const { data, loading, error } = useActiveEstimateQuery();

  const results = useMemo(() => {
    if (data && data.getActiveEstimate) {
      return data.getActiveEstimate.values.reduce<Record<string, string[]>>(function (acc, currentValue) {
        (acc[currentValue.value] = acc[currentValue.value] || []).push(currentValue.user._id);
        return acc;
      }, {});
    }
  }, [data]);

  const maxWeight = max(values(results).map(v => v.length)) ?? 0;

  return (
    <div className={styles.bar}>
      {results &&
        keys(results).map((value, index) => {
          const users = results[value];
          const weight = users.length;

          return (
            <Box key={index} sx={{ flexGrow: weight }}>
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
                      <Avatar variant="rounded" title="Test" sx={{ mx: 1, my: 1 }}>
                        <PersonIcon />
                      </Avatar>
                    </Tooltip>
                  </Box>
                ))}
              </Box>
            </Box>
          );
        })}
    </div>
  );
}

const styles = {
    bar: css`
      display: flex;
    `
};
