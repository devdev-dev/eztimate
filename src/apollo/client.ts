import { ApolloClient, InMemoryCache } from '@apollo/client';
export const apolloClient = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
  connectToDevTools: true
  //   defaultOptions: {
  //     watchQuery: {
  //       fetchPolicy: 'no-cache',
  //       errorPolicy: 'ignore'
  //     },
  //     query: {
  //       fetchPolicy: 'no-cache',
  //       errorPolicy: 'all'
  //     }
  //   }
});
