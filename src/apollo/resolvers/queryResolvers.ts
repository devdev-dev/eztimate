import Cookies from 'cookies';
import { IResolvers } from 'graphql-tools';
import { CookieName } from '../../utils';
import { getObjectId } from '../../utils/mongodb';

export const resolvers: IResolvers = {
  Query: {
    async loggedInUser(parent, args, context) {
      return await context.db.collection('users').findOne({ _id: getObjectId(context.session.user.id) });
    },
    activeTeam: async (parent, args, { db, context: { req, res } }) => {
      const team = await db.collection('teams').findOne({ _id: getObjectId(new Cookies(req, res).get(CookieName.TEAM_ID)) });
      return team;
    }
  }
};
