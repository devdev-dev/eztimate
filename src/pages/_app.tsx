import { ApolloProvider } from '@apollo/client';
import { PusherProvider } from '@harelpls/use-pusher';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Provider } from 'next-auth/client';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { apolloClient } from '../apollo/client';
import theme from '../utils/mui/theme';

const config = {
  clientKey: process.env.PUSHER_APP_ID,
  cluster: 'eu',
  triggerEndpoint: '/api/pusher'
};

export default function MyApp(props) {
  const { Component, pageProps } = props;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const getLayout = Component.getLayout || (page => page);

  return (
    <>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <Provider session={pageProps.session}>
          <PusherProvider {...config}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
          </PusherProvider>
        </Provider>
      </ApolloProvider>
      ,
    </>
  );
}
