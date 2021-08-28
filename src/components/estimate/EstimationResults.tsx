import { css } from '@emotion/css';
import { Avatar, lighten } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import PersonIcon from '@material-ui/icons/Person';
import * as React from 'react';
import { useActiveEstimateQuery } from '../../generated/graphql';

export default function EstimationResults() {

  const {data, loading, error} = useActiveEstimateQuery()

  console.log(data)

  const display = [
    {value: 0, weight: 3},
    {value: 4, weight: 2},
    {value: 3, weight: 1}
  ];
  const maxWeight = display.map(v => v.weight).reduce((previousValue, currentValue) => Math.max(previousValue, currentValue));

  return (
      <div className={styles.bar}>
        {display.map((d, index) => (
            <Box key={index} sx={{flexGrow: d.weight}}>
              <Box
                  sx={{
                    flexGrow: d.weight,
                    bgcolor: lighten('#556cd6', 1 - d.weight / maxWeight),
                    color: 'white',
                    border: 1,
                    textAlign: 'center'
                  }}
              >
                {d.value}
              </Box>
              <Box sx={{p: 2, display: 'flex', justifyContent: 'center'}}>
                {new Array(d.weight).fill(' ').map((n, i) => (
                    <Box key={i} sx={{display: 'flex', alignItems: 'center'}}>
                      <Avatar variant="rounded" title="Test" sx={{mx: 1, my: 1}}>
                        <PersonIcon/>
                      </Avatar>
                    </Box>
                ))}
              </Box>
            </Box>
        ))}
      </div>
  );
}

const styles = {
  bar: css`
    display: flex;
  `
};
