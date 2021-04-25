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
    },
    activeIssue: async (parent, args, { db, context: { req, res } }) => {
      const activeIssue = await db
        .collection('teams')
        .aggregate([
          { $match: { _id: getObjectId(new Cookies(req, res).get(CookieName.TEAM_ID)) } },
          {
            $lookup: {
              from: 'issues',
              localField: 'estimatedIssue',
              foreignField: '_id',
              as: 'estimatedIssue'
            }
          },
          { $unwind: '$estimatedIssue' },
          { $replaceRoot: { newRoot: '$estimatedIssue' } }
        ])
        .toArray();

      console.log(activeIssue);

      return activeIssue[0];
    }
  }
};
