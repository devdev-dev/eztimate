import { ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-micro';
import { NextApiRequest, NextApiResponse } from 'next';
import { basicResolvers, mutationResolvers, queryResolvers } from '../../src/server/graphql/resolvers';
import * as typeDefs from '../../src/server/graphql/schema.graphql';

console.time('Apollo Server Startup Time');
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: { ...basicResolvers, ...queryResolvers, ...mutationResolvers },
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

const startServer = apolloServer.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql'
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false
  }
};

console.timeEnd('Apollo Server Startup Time');