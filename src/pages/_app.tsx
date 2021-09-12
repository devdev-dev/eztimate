import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import createCache from '@emotion/cache';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider as MUIThemeProvider } from '@mui/material';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import { ReactElement, ReactNode, useEffect } from 'react';
import theme from '../theme';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const cache = createCache({ key: 'css', prepend: true });
cache.compat = true;

export const apolloClient = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
  connectToDevTools: true
});

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useServiceWorker();

  const getLayout = Component.getLayout ?? (page => page);

  return (
    <CacheProvider value={cache}>
      <Head>
        <title>Eztimate App</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ApolloProvider client={apolloClient}>
        <MUIThemeProvider theme={theme}>
          <CssBaseline />
          <ThemeProvider theme={theme}>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
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
