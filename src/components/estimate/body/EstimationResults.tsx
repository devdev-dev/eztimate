import { css } from '@emotion/css';
import * as React from 'react';
import { IssueState, useActiveIssueQuery } from '../../../generated/graphql';
import { EstimationResultBar, EstimationResultBarSkeleton } from './EstimationResultBar';

export default function EstimationResults() {
  const { data, loading, error } = useActiveIssueQuery();

  return (
    <div className={styles.bar}>
      {loading && !data && <EstimationResultBarSkeleton />}
      {!loading && data && (
        <EstimationResultBar
          estimates={data?.getActiveIssue?.estimates ?? []}
          hideResults={(data && data?.getActiveIssue && data?.getActiveIssue?.state === IssueState.COLLECT) ?? true}
        />
      )}
    </div>
  );
}

const styles = {
  bar: css`
    display: flex;
    overflow: hidden;
  `
};
