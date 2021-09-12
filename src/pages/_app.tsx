import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import createCache from '@emotion/cache';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider as MUIThemeProvider } from '@mui/material';
import { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import { useEffect } from 'react';
import theme from '../theme';

const cache = createCache({ key: 'css', prepend: true });
cache.compat = true;

export const apolloClient = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
  connectToDevTools: true
});

export default function MyApp({ Component, pageProps }: AppProps) {
  useServiceWorker();

  return (
    <CacheProvider value={cache}>
      <Head>
        <title>Eztimate App</title>
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

function useServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/serviceworker.js').then(
          function (registration) {
            console.log('Service Worker registration successful with scope: ', registration.scope);
          },
          function (err) {
            console.log('Service Worker registration failed: ', err);
          }
        );
      });
    }
  }, []);
}
