import { css } from '@emotion/css';
import { Avatar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import PersonIcon from '@material-ui/icons/Person';
import * as React from 'react';

export default function EstimationResults() {
  const results = [1, 1, 1, 3, 4, 4];
  const display = [
    { value: 0, weight: 6, color: '#0000cc' },
    { value: 4, weight: 1, color: '#0000aa' },
    { value: 3, weight: 1, color: '#0000cc' }
  ];

  return (
    <div className={styles.bar}>
      {display.map((d, index) => (
        <Box key={index} sx={{ flexGrow: d.weight }}>
          <div
            style={{
              flexGrow: d.weight,
              background: d.color,
              color: 'white',
              border: '1px solid white',
              textAlign: 'center'
            }}
          >
            {d.value}
          </div>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            {new Array(d.weight).fill(' ').map((n, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar variant="rounded" title="Test" sx={{ mx: 1, my: 1 }}>
                  <PersonIcon />
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
