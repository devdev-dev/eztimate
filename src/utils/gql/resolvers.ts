import { IResolvers } from 'graphql-tools';
import { getObjectId } from '../mongodb/mongodb';

export const resolvers: IResolvers = {
  Query: {
    async loggedInUser(parent, args, context) {
      const loggedInUser = await context.db.collection('users').findOne({ _id: getObjectId(context.session.user.id) });
      return loggedInUser;
    }
  },
  Mutation: {
    userAddTeam: async (_, { teamId }, { db, session }) => {
      const teamIdObject = getObjectId(teamId);
      const loggedInUserIdObject = getObjectId(session.user.id);

      await db.collection('users').findOneAndUpdate(
        { _id: loggedInUserIdObject },
        {
          $addToSet: {
            teams: teamIdObject
          }
        }
      );

      const { value: team } = await db.collection('teams').findOneAndUpdate(
        { _id: teamIdObject },
        {
          $addToSet: {
            users: loggedInUserIdObject
          }
        }
      );

      return team;
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
