import { ApolloServer } from 'apollo-server-micro';
import { getSession } from 'next-auth/client';
import schema from '../../apollo/schema';
import getDatabase from '../../utils/mongodb/mongodb';

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
  }
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: '/api/graphql' });
