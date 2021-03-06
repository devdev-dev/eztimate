import { CssBaseline, ThemeProvider } from '@material-ui/core';
import Head from 'next/head';
import React from 'react';
import { ClientContextProvider, createClient } from 'react-fetching-library';
import theme from '../components/mui/theme';

const client = createClient();

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
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
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </ClientContextProvider>
      ,
    </>
  );
}
