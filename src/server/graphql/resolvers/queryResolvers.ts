import { Issue, QueryResolvers } from '../../../generated/graphql';

export const queryResolvers: QueryResolvers = {
  async getActiveIssue(parent, args, { db, issueId }) {
    return (await db.collection('issues').findOne({ _id: issueId })) as Issue;
  }
};
