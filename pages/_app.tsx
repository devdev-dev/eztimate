import { CssBaseline, ThemeProvider } from '@material-ui/core';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import { ClientContextProvider, createClient } from 'react-fetching-library';
import theme from '../utils/mui/theme';

const client = createClient();

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
      <ClientContextProvider client={client}>
        <CookiesProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </CookiesProvider>
      </ClientContextProvider>
      ,
    </>
  );
}
