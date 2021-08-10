import * as React from 'react';
import AppLayout from '../../src/AppLayout';
import Copyright from '../../src/components/Copyright';
import Estimate from '../../src/components/estimate/Estimate';

export default function InstantEstimate() {
  return (
    <AppLayout>
      <Estimate />
      <Copyright sx={{ pt: 4 }} />
    </AppLayout>
  );
}
