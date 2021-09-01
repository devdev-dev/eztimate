import { Estimate, EstimateResolvers, IssueResolvers, User } from '../../../generated/graphql';

export const estimateResolvers: EstimateResolvers = {
  async user(estimate, args, { db }) {
    return (await db.collection('users').findOne({ _id: estimate.user })) as User;
  }
};

export const issueResolvers: IssueResolvers = {
  async estimates(issue, args, { db }) {
    if (issue.estimates) {
      return (await db
        .collection('estimates')
        .find({ _id: { $in: issue.estimates } })
        .toArray()) as Estimate[];
    }
    return [];
  }
};
