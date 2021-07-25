import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import theme from '../src/theme';
import { UserProvider } from '@auth0/nextjs-auth0';

const cache = createCache({ key: 'css', prepend: true });
cache.compat = true;

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <CacheProvider value={cache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <MUIThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </ThemeProvider>
      </MUIThemeProvider>
    </CacheProvider>
  );
}
