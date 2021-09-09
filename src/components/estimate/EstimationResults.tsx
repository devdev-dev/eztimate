import { css } from '@emotion/css';
import * as React from 'react';
import { IssueState, useActiveIssueQuery } from '../../generated/graphql';
import { EstimationResultBar, EstimationResultBarHidden } from './EstimationResultBar';

export default function EstimationResults() {
  const { data, loading, error } = useActiveIssueQuery();

  return (
    <div className={styles.bar}>
      {data && data.getActiveIssue && data.getActiveIssue.state === IssueState.COLLECT && (
        <EstimationResultBarHidden estimates={data.getActiveIssue.estimates} />
      )}
      {data && data.getActiveIssue && data.getActiveIssue.state === IssueState.DISCUSS && <EstimationResultBar estimates={data.getActiveIssue.estimates} />}
    </div>
  );
}

const styles = {
  bar: css`
    display: flex;
    overflow: hidden;
  `
};
