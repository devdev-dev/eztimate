import Cookies from 'cookies';
import { IResolvers } from 'graphql-tools';
import { getObjectId } from '../utils/mongodb/mongodb';
import { CookieName, IssueState } from '../utils/types';
import { Team, User } from './types.grapqhl';

export const resolvers: IResolvers = {
  Query: {
    async loggedInUser(parent, args, context) {
      return await context.db.collection('users').findOne({ _id: getObjectId(context.session.user.id) });
    },
    activeTeam: async (parent, args, { db, context: { req, res } }) => {
      return await db.collection('teams').findOne({ _id: getObjectId(new Cookies(req, res).get(CookieName.TEAM_ID)) });
    }
  },
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
    issueCreate: async (_, { issueName }, { db, context: { req, res } }) => {
      const issueInsertResult = await db.collection('issues').insertOne({
        name: issueName,
        state: IssueState.OPEN,
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
    issueUpdate: async (_, { id, name }, { db }) => {
      let update = {};
      if (name) update = { ...update, name: name };

      const { value: issue } = await db.collection('issues').findOneAndUpdate(
        { _id: getObjectId(id) },
        {
          $set: update
        },
        { returnOriginal: false }
      );

      return issue;
    },
    issueDelete: async (_, { issueId }, { db }) => {
      await db.collection('issues').deleteOne({ _id: getObjectId(issueId) });
      return true;
    },
    issueEstimate: async (_, { issueId }, { db, context: { req, res } }) => {
      const { value: issue } = await db.collection('teams').findOneAndUpdate(
        { _id: getObjectId(new Cookies(req, res).get(CookieName.TEAM_ID)) },
        {
          $set: {
            estimatedIssue: getObjectId(issueId)
          }
        }
      );
      return issue;
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
  }
};
