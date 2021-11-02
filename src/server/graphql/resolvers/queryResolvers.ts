import { Issue, QueryResolvers, User } from '../../../generated/graphql';
import { getObjectId } from '../../mongo';

export const queryResolvers: QueryResolvers = {
  async validateIssue(parent, { id }, { db }) {
    return (await db.collection('issues').findOne({ _id: getObjectId(id) })) as Issue;
  },
  async getActiveIssue(parent, args, { db, issueId }) {
    return (await db.collection('issues').findOne({ _id: issueId })) as Issue;
  },
  async getActiveUser(parent, args, { db, userId }) {
    let dbUser = await db.collection('users').findOne({ _id: userId });

    if (dbUser === null) {
      const { insertedId } = await db.collection('users').insertOne({});
      dbUser = { _id: insertedId.toHexString() };
    }

    return dbUser as User;
  },
  async getUser(parent, { id }, { db }) {
    return (await db.collection('users').findOne({ _id: getObjectId(id) })) as User;
  }
};
