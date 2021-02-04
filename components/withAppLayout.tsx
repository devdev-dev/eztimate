import React from 'react';
import BottomAppBar from './BottomAppBar';

const AppLayout = ({ children }) => (
  <div>
    <BottomAppBar />
    {children}
  </div>
);

const withAppLayout = WrappedComponent => {
  const hocComponentWithLayout = page => <AppLayout>{page}</AppLayout>;
  WrappedComponent.getLayout = hocComponentWithLayout;

  return WrappedComponent;
};

export default withAppLayout;
