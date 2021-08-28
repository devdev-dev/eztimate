import { ApolloServer } from 'apollo-server-micro';
import { NextApiRequest, NextApiResponse } from 'next';
import { basicResolvers, mutationResolvers, queryResolvers } from '../../src/server/graphql/resolvers';
import * as typeDefs from '../../src/server/graphql/schema.graphql';

console.time('Apollo Server Startup Time');

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: { ...basicResolvers, ...queryResolvers, ...mutationResolvers }
});

const startServer = apolloServer.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', 'https://studio.apollographql.com');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

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