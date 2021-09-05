import { Issue, QueryResolvers, User } from '../../../generated/graphql';

export const queryResolvers: QueryResolvers = {
  async getActiveIssue(parent, args, { db, issueId }) {
    return (await db.collection('issues').findOne({ _id: issueId })) as Issue;
  },
  async getActiveUser(parent, args, { db, userId }) {
    return (await db.collection('users').findOne({ _id: userId })) as User;
  }
};
