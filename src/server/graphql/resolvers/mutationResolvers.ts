import { Estimate, MutationResolvers } from '../../../generated/graphql';

export const mutationResolvers: MutationResolvers = {
  estimateActiveIssue: async (_, { value }, { db, issueId, userId }) => {
    const { value: dbEstimate } = await db.collection('estimates').findOneAndReplace(
      { user: userId },
      {
        value: value,
        user: userId
      },
      { upsert: true, returnDocument: 'after' }
    );

    if (dbEstimate) {
      await db.collection('issues').updateOne(
        { _id: issueId },
        {
          $addToSet: {
            estimates: dbEstimate._id
          }
        }
      );
    }

    return dbEstimate as Estimate;
  }
};
