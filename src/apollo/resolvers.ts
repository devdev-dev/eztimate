import Cookies from 'cookies';
import { IResolvers } from 'graphql-tools';
import { getObjectId } from '../utils/mongodb/mongodb';
import { CookieName } from '../utils/types';
import { Estimate, Issue, IssueState, Team, User } from './types.grapqhl';

export const resolvers: IResolvers = {
  Mutation: {
    userJoinTeam: async (_, { teamId }, { db, session }) => {
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
    },
    teamCreate: async (_, { teamName }, { db, session }) => {
      const loggedInUserIdObject = getObjectId(session.user.id);

      const teamInsertResult = await db.collection('teams').insertOne({
        name: teamName,
        users: [loggedInUserIdObject]
      });

      await db.collection('users').updateOne(
        { _id: loggedInUserIdObject },
        {
          $addToSet: {
            teams: teamInsertResult.insertedId
          }
        }
      );

      return teamInsertResult.ops[0];
    },
    teamSetActiveIssue: async (_, { id }, { db, context: { req, res } }) => {
      const { value: team } = await db.collection('teams').findOneAndUpdate(
        { _id: getObjectId(new Cookies(req, res).get(CookieName.TEAM_ID)) },
        {
          $set: {
            estimatedIssue: getObjectId(id)
          }
        },
        { returnOriginal: false }
      );
      return team;
    },
    issueCreate: async (_, { name }, { db, context: { req, res } }) => {
      const issueInsertResult = await db.collection('issues').insertOne({
        name: name,
        state: IssueState.Open,
        dateCreated: Date.now()
      });

      if (issueInsertResult.insertedId) {
        await db.collection('teams').updateOne(
          { _id: getObjectId(new Cookies(req, res).get(CookieName.TEAM_ID)) },
          {
            $addToSet: {
              issues: issueInsertResult.insertedId
            }
          }
        );
      }

      return issueInsertResult.ops[0];
    },
    issueUpdate: async (_, { id, name, state }, { db }) => {
      let update = {};
      if (name) update = { ...update, name: name };
      if (state) update = { ...update, state: state };

      const { value: issue } = await db.collection('issues').findOneAndUpdate(
        { _id: getObjectId(id) },
        {
          $set: update
        },
        { returnOriginal: false }
      );

      return issue;
    },
    issueDelete: async (_, { id }, { db }) => {
      const { value } = await db.collection('issues').findOneAndDelete({ _id: getObjectId(id) });
      return value;
    },
    estimateCreate: async (_, { issueId, value }, { db, session }) => {
      const { value: estimate } = await db.collection('estimates').findOneAndReplace(
        { user: getObjectId(session.user.id) },
        {
          user: getObjectId(session.user.id),
          value
        },
        { upsert: true, returnOriginal: false }
      );

      if (estimate) {
        await db.collection('issues').updateOne(
          { _id: getObjectId(issueId) },
          {
            $addToSet: {
              estimates: estimate._id
            }
          }
        );
      }

      return estimate;
    },
    estimateDelete: async (_, { id }, { db }) => {
      const estimateIdObject = getObjectId(id);
      const { value } = await db.collection('estimates').findOneAndDelete({ _id: estimateIdObject });
      await db.collection('issues').updateOne({ estimates: { $elemMatch: { $eq: estimateIdObject } } }, { $pull: { estimates: estimateIdObject } });

      return value;
    }
  },
  Query: {
    async loggedInUser(parent, args, context) {
      return await context.db.collection('users').findOne({ _id: getObjectId(context.session.user.id) });
    },
    activeTeam: async (parent, args, { db, context: { req, res } }) => {
      const team = await db.collection('teams').findOne({ _id: getObjectId(new Cookies(req, res).get(CookieName.TEAM_ID)) });
      return team;
    }
  },
  User: {
    async teams(user: User, args, { db }) {
      const teams = await db
        .collection('teams')
        .find({ _id: { $in: user.teams } })
        .toArray();

      return teams;
    }
  },
  Team: {
    async users(team: Team, args, { db }) {
      const users = await db
        .collection('users')
        .find({ _id: { $in: team.users } })
        .toArray();

      return users;
    },
    async issues(team: Team, args, { db }) {
      const issues = await db
        .collection('issues')
        .find({ _id: { $in: team.issues } })
        .sort({ dateCreated: -1 })
        .toArray();

      return issues;
    },
    async estimatedIssue(team: Team, args, { db }) {
      const issue = await db.collection('issues').findOne({ _id: team.estimatedIssue });
      return issue;
    }
  },
  Issue: {
    async estimates(issue: Issue, args, { db }) {
      if (issue.estimates) {
        return await db
          .collection('estimates')
          .find({ _id: { $in: issue.estimates ?? [] } })
          .toArray();
      }
      return [];
    }
  },
  Estimate: {
    async user(estimate: Estimate, args, { db }) {
      const user = await db.collection('users').findOne({ _id: estimate.user });
      return user;
    }
  }
};
