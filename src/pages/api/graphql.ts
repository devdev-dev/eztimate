import { ApolloServer, gql } from 'apollo-server-micro';
import { getSession } from 'next-auth/client';
import getDatabase, { getObjectId } from '../../utils/mongodb/mongodb';

const typeDefs = gql`
  type Query {
    loggedInUser: [User]!
  }
  type Team {
    _id: String!
    users: [User]!
  }
  type User {
    _id: String!
    email: String
    teams: Team
  }
`;

const resolvers = {
  Query: {
    async loggedInUser(parent, args, context) {
      console.log(context.session);
      const loggedInUser = await context.db.collection('users').findOne({ _id: getObjectId(context.session.user.id) });
      return [loggedInUser];
    }
  }
};

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
