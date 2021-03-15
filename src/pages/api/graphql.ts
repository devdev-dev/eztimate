import { ApolloServer } from 'apollo-server-micro';
import { getSession } from 'next-auth/client';
import schema from '../../utils/gql/schema';
import getDatabase from '../../utils/mongodb/mongodb';

const apolloServer = new ApolloServer({
  schema,
  playground: {
    settings: {
      'request.credentials': 'include'
    }
  },
  context: async ({ req }) => {
    const session = await getSession({ req });
    const { db } = await getDatabase();

    return {
      session,
      db
    };
  }
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: '/api/graphql' });
