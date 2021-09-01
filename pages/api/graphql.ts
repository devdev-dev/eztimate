import { ApolloServer, AuthenticationError } from 'apollo-server-micro';
import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';
import { CookieName } from '../../src/cookies';
import { resolvers } from '../../src/server/graphql/resolvers';
import * as typeDefs from '../../src/server/graphql/schema.graphql';
import getDatabase, { getObjectId } from '../../src/server/mongo';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    const userId = getObjectId(new Cookies(req, res).get(CookieName.USER_ID));
    const issueId = getObjectId(new Cookies(req, res).get(CookieName.ISSUE_ID));

    if (!issueId || !userId) {
      throw new AuthenticationError('Not authenticated!!');
    }

    const { db } = await getDatabase();

    return {
      db,
      issueId,
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
