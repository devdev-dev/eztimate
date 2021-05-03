import Cookies from 'cookies';
import { IResolvers } from 'graphql-tools';
import { CookieName, defaultCardSet } from '../../utils';
import { getObjectId } from '../../utils/mongodb';
import { IssueState } from '../types.grapqhl';

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
    userUpdate: async (_, { id, email, username, avatar }, { db }) => {
      let update = {};
      if (email !== undefined) update = { ...update, email };
      if (username !== undefined) update = { ...update, username };
      if (avatar !== undefined) update = { ...update, avatar };

      const { value: user } = await db.collection('users').findOneAndUpdate(
        { _id: getObjectId(id) },
        {
          $set: update
        },
        { returnOriginal: false }
      );

      return user;
    },
    teamCreate: async (_, { teamName }, { db, session }) => {
      const loggedInUserIdObject = getObjectId(session.user.id);

      const teamInsertResult = await db.collection('teams').insertOne({
        name: teamName,
        cardSet: defaultCardSet,
        users: [loggedInUserIdObject],
        issues: []
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
    teamUpdate: async (_, { id, name, activeIssueId }, { db }) => {
      let update = {};
      if (name !== undefined) update = { ...update, name: name };
      if (activeIssueId !== undefined) update = { ...update, estimatedIssue: getObjectId(activeIssueId) };

      const { value: team } = await db.collection('teams').findOneAndUpdate(
        { _id: getObjectId(id) },
        {
          $set: update
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
    issueUpdate: async (_, { id, name, state, estimate }, { db }) => {
      let update = {};
      if (name !== undefined) update = { ...update, name: name };
      if (state !== undefined) update = { ...update, state: state };
      if (estimate !== undefined) update = { ...update, estimate: estimate };

      const { value: issue } = await db.collection('issues').findOneAndUpdate(
        { _id: getObjectId(id) },
        {
          $set: update
        },
        { returnOriginal: false }
      );

      return issue;
    },
    issueReset: async (_, { id }, { db }) => {
      let issue = await db.collection('issues').findOne({ _id: getObjectId(id) });
      db.collection('estimates').deleteMany({ _id: { $in: issue.estimates } });

      issue = (
        await db.collection('issues').findOneAndUpdate(
          { _id: getObjectId(id) },
          {
            $set: {
              estimates: [],
              state: IssueState.Open
            },
            $unset: {
              estimate: ''
            }
          },
          { returnOriginal: false }
        )
      ).value;

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
          issue: getObjectId(issueId),
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
  }
};
