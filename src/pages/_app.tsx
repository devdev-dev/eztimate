import { ApolloProvider } from '@apollo/client';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Provider } from 'next-auth/client';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { apolloClient } from '../apollo/client';
import { IntlProvider } from '../l10n/IntlProvider';
import theme from '../utils/mui/theme';
import { initSentry } from '../utils/sentry';

initSentry();

export default function MyApp({ Component, pageProps, err }) {
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
          <IntlProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {getLayout(<Component {...pageProps} err={err} />)}
            </ThemeProvider>
          </IntlProvider>
        </Provider>
      </ApolloProvider>
      ,
    </>
  );
}
