import { ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-micro';
import schema from '../../src/server/graphql/schema';

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req, res }) => {
    return {
      context: { req, res }
    };
  },
  plugins: [
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground({
          settings: {
            'request.credentials': 'include'
          }
        })
  ]
});

// @ts-ignore
await apolloServer.start();

export default apolloServer.createHandler({
  path: '/api/graphql'
});
