import { Issue, MutationResolvers } from '../../../generated/graphql';
import { DatabaseError } from '../../../pages/api/graphql';

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
      const { value: dbIssue } = await db.collection('issues').findOneAndUpdate(
        { _id: issueId },
        {
          $addToSet: {
            estimates: dbEstimate._id
          }
        },
        { returnDocument: 'after' }
      );
      return dbIssue as Issue;
    } else {
      throw new DatabaseError('Create / Update estimate not possible. ');
    }
  }
};
