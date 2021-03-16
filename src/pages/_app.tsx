import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Provider } from 'next-auth/client';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import theme from '../utils/mui/theme';

const queryClient = new QueryClient();

const apolloClient = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache()
});

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
        <QueryClientProvider client={queryClient}>
          <Provider session={pageProps.session}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
          </Provider>
        </QueryClientProvider>
      </ApolloProvider>
      ,
    </>
  );
}
