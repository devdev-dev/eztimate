import { ApolloError } from 'apollo-server-errors';
import { ApolloServer } from 'apollo-server-micro';
import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';
import { CookieName } from '../../cookies';
import { pusherPlugin } from '../../server/graphql/plugins/pusher';
import { resolvers } from '../../server/graphql/resolvers';
import * as typeDefs from '../../server/graphql/schema.graphql';
import getDatabase, { getObjectId } from '../../server/mongo';

console.time('gqlroute');
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [pusherPlugin],
  context: async ({ req, res }) => {
    const userId = getObjectId(new Cookies(req, res).get(CookieName.USER_ID));
    const issueId = getObjectId(new Cookies(req, res).get(CookieName.ISSUE_ID));

    const { db } = await getDatabase();

    return {
      db,
      issueId,
      userId,
      context: { req, res }
    };
  }
});

export class DatabaseError extends ApolloError {
  constructor(message: string) {
    super(message, 'DATABASE_ERROR');

    Object.defineProperty(this, 'name', { value: 'DatabaseError' });
  }
}

console.timeStamp('gqlroute');
const startServer = apolloServer.start();
console.timeStamp('gqlroute');

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
    path: `/api/graphql`
  })(req, res);
}

console.timeEnd('gqlroute');
export const config = {
  api: {
    bodyParser: false
  }
};
