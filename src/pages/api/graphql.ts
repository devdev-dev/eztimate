import { ApolloServer } from 'apollo-server-micro';
import { getSession } from 'next-auth/client';
import getDatabase from '../../utils/mongodb/mongodb';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
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
