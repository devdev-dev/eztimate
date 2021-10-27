import { css } from '@emotion/css';
import { Skeleton, Theme, useTheme } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useActiveIssueQuery, useActiveUserQuery, useUpdateUserEstimateMutation } from '../../../generated/graphql';
import EstimationCard from './EstimationCard';

const EstimationCardStack = () => {
  const theme = useTheme();
  const [userEstimate, setUserEstimate] = useState<string | null>(null);

  const { data, loading } = useActiveIssueQuery();
  const { data: userData } = useActiveUserQuery();

  useEffect(() => {
    setUserEstimate(data?.getActiveIssue?.estimates.find(e => e.user._id === userData?.getActiveUser?._id)?.value ?? null);
  }, [data, userData, setUserEstimate]);

  const [updateEstimate] = useUpdateUserEstimateMutation();

  return (
    <>
      {loading && !data && (
        <div className={styles.stack(theme)}>
          <div className="skeleton">
            <Skeleton variant="rectangular" height="100px" />
          </div>
          <div className="skeleton">
            <Skeleton variant="rectangular" height="100px" />
          </div>
          <div className="skeleton">
            <Skeleton variant="rectangular" height="100px" />
          </div>
        </div>
      )}
      {!loading && data && (
        <div className={styles.stack(theme)}>
          {data.getActiveIssue?.stack.map((value, index) => {
            const isEstimatedCardValue = userEstimate === value;
            return (
              <EstimationCard
                key={index}
                value={value}
                selected={isEstimatedCardValue}
                onClick={value => {
                  updateEstimate({ variables: { value: value } });
                  setUserEstimate(value);
                }}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

const styles = {
  stack: (theme: Theme) => css`
    display: grid;
    grid-template-columns: repeat(auto-fit, 75px);
    justify-content: center;
    grid-gap: 1rem;
    margin: 50px 75px 50px ${theme.spacing(0)};
    user-select: none;
    transform-style: preserve-3d;
  `
};

export default EstimationCardStack;
