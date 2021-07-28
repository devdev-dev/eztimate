import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import * as React from 'react';
import CardStack from './CardStack';
import EstimationResults from './EstimationResults';
import EstimationToolbar from './EstimationToolbar';

const EstimationPanel = () => {
  return (
    <>
      <EstimationToolbar />
      <EstimationResults />
    </>
  );
};

export default EstimationPanel;
