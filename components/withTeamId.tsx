import Router from 'next/router';
import React from 'react';
import { parseCookies } from '../utils/cookies';

const withTeamId = WrappedComponent => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async context => {
    const cookies = parseCookies(context.req);
    if (!cookies.teamId) {
      if (context.res) {
        context.res?.writeHead(302, {
          Location: '/?redirected=true'
        });
        context.res?.end();
      } else {
        Router.replace('/?redirected=true');
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({ ...context, teamId: cookies.teamId });
      return { ...wrappedProps, teamId: cookies.teamId };
    }

    return { teamId: cookies.teamId };
  };

  return hocComponent;
};

export default withTeamId;
