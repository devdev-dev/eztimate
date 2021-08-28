import { ApolloServer, AuthenticationError } from 'apollo-server-micro';
import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';
import { CookieName } from '../../src/cookies';
import { basicResolvers, mutationResolvers, queryResolvers } from '../../src/server/graphql/resolvers';
import * as typeDefs from '../../src/server/graphql/schema.graphql';
import getDatabase, { getObjectId } from '../../src/server/mongo';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: { ...basicResolvers, ...queryResolvers, ...mutationResolvers },
  context: async ({ req, res }) => {
    const estimateId = getObjectId(new Cookies(req, res).get(CookieName.ESTIMATE_ID));
    const userId = getObjectId(new Cookies(req, res).get(CookieName.ESTIMATE_ID));

    if (!estimateId || !userId) {
      throw new AuthenticationError('No active Session found!');
    }

    const { db } = await getDatabase();

    return {
      db,
      estimateId,
      userId,
      context: { req, res }
    };
  }
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
