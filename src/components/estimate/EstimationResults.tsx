import { css } from '@emotion/css';
import * as React from 'react';
import { useActiveIssueQuery } from '../../generated/graphql';
import EstimationResultBar from './EstimationResultBar';

export default function EstimationResults() {
  const { data, loading, error } = useActiveIssueQuery();

  return <div className={styles.bar}>{data && data.getActiveIssue && <EstimationResultBar estimates={data.getActiveIssue.estimates} />}</div>;
}

const styles = {
  bar: css`
    display: flex;
    height: 150px;
    overflow: hidden;
  `
};
