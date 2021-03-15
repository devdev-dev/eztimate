import { getObjectId } from '../../utils/mongodb/mongodb';

export const resolvers = {
  Query: {
    async loggedInUser(parent, args, context) {
      const loggedInUser = await context.db.collection('users').findOne({ _id: getObjectId(context.session.user.id) });
      return loggedInUser;
    }
  },
  User: {
    async teams(parent, args, context) {
      const teams = await context.db
        .collection('teams')
        .find({ _id: { $in: parent.teams } })
        .toArray();

      return teams;
    }
  },
  Team: {
    async users(parent, args, context) {
      const users = await context.db
        .collection('users')
        .find({ _id: { $in: parent.users } })
        .toArray();

      return users;
    }
  }
};
