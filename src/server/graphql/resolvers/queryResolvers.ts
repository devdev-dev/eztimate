import { Issue, IssueState, QueryResolvers } from '../../../generated/graphql';

export const queryResolvers: QueryResolvers = {
  async getActiveIssue(parent, args, { db, issueId }) {
    let issueIdToQuery = issueId;
    if (!issueId) {
      const { insertedId } = await db.collection('issues').insertOne({
        state: IssueState.Collect,
        estimates: []
      });
      issueIdToQuery = insertedId;
    }

    return (await db.collection('issues').findOne({ _id: issueIdToQuery })) as Issue;
  }
};
