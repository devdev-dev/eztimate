import { css } from '@emotion/css';
import { Skeleton, Theme, useTheme } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useActiveIssueQuery, useActiveUserQuery, useUpdateUserEstimateMutation } from '../../../generated/graphql';
import { useAppLoading } from '../../layout/AppContext';
import EstimationCard from './EstimationCard';

const EstimationCardStack = () => {
  const theme = useTheme();
  const globalLoading = useAppLoading();
  const [userEstimate, setUserEstimate] = useState<string | null>(null);

  const { data: issueData, loading } = useActiveIssueQuery();
  const { data: userData } = useActiveUserQuery();

  useEffect(() => {
    setUserEstimate(issueData?.getActiveIssue?.estimates.find(e => e.user._id === userData?.getActiveUser?._id)?.value ?? null);
  }, [issueData, userData, setUserEstimate]);

  const [updateEstimate] = useUpdateUserEstimateMutation();

  return (
    <>
      {loading && !issueData && (
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
      {!loading && issueData && (
        <div className={styles.stack(theme)}>
          {issueData.getActiveIssue?.stack.map((value, index) => {
            const isEstimatedCardValue = userEstimate === value;
            return (
              <EstimationCard
                key={index}
                value={value}
                selected={isEstimatedCardValue}
                disabled={globalLoading.value}
                onClick={value => {
                  setUserEstimate(value);
                  globalLoading.set(true);
                  updateEstimate({ variables: { value: value } }).then(() => {
                    globalLoading.set(false);
                  });
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
