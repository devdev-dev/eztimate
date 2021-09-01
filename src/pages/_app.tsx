import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import createCache from '@emotion/cache';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import theme from '../theme';

const cache = createCache({ key: 'css', prepend: true });
cache.compat = true;

export const apolloClient = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
  connectToDevTools: true
});

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <CacheProvider value={cache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ApolloProvider client={apolloClient}>
        <MUIThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </MUIThemeProvider>
      </ApolloProvider>
    </CacheProvider>
  );
}
