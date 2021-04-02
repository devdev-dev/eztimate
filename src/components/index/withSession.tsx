import { getSession } from 'next-auth/client';
import Router from 'next/router';
import React from 'react';

const login = '/signin?redirected=true';

const withSession = WrappedComponent => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async context => {
    const session = await getSession(context);

    if (!session) {
      if (context.res) {
        context.res?.writeHead(302, {
          Location: login
        });
        context.res?.end();
      } else {
        Router.replace(login);
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({ ...context, auth: session });
      return { ...wrappedProps, session };
    }

    return { session };
  };

  return hocComponent;
};

export default withSession;
