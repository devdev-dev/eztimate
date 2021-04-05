import { ApolloServer } from 'apollo-server-micro';
import { getSession } from 'next-auth/client';
import { pusherPlugin } from '../../apollo/plugins/pusher';
import schema from '../../apollo/schema';
import getDatabase from '../../utils/mongodb';
import { initSentry } from '../../utils/sentry';

initSentry();

const apolloServer = new ApolloServer({
  schema,
  playground: {
    settings: {
      'request.credentials': 'include'
    }
  },
  context: async ({ req, res }) => {
    const session = await getSession({ req });
    const { db } = await getDatabase();

    return {
      session,
      db,
      context: { req, res }
    };
  },
  plugins: [pusherPlugin]
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({
  path: '/api/graphql'
});
