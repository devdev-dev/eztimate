import { Issue, IssueState, MutationResolvers, User } from '../../../generated/graphql';
import { DatabaseError } from '../../../pages/api/graphql';

export const mutationResolvers: MutationResolvers = {
  createActiveIssue: async (_, {}, { db }) => {
    const { insertedId } = await db.collection('issues').insertOne({
      state: IssueState.Collect,
      estimates: []
    });

    const issue: Issue = { _id: insertedId.toHexString(), state: IssueState.Collect, estimates: [] };
    return issue;
  },
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
  },
  resetActiveIssue: async (_, {}, { db, issueId }) => {
    const dbIssue = (
      await db.collection('issues').findOneAndUpdate(
        { _id: issueId },
        {
          $set: {
            estimates: [],
            state: IssueState.Collect
          },
          $unset: {
            estimate: ''
          }
        },
        { returnDocument: 'after' }
      )
    ).value;

    if (dbIssue) {
      db.collection('estimates').deleteMany({ _id: { $in: dbIssue!.estimates } });
      return dbIssue as Issue;
    } else {
      throw new DatabaseError('Reset issue failed. ');
    }
  },
  createUser: async (_, {}, { db }) => {
    const { insertedId } = await db.collection('users').insertOne({});
    const user: User = { _id: insertedId.toHexString() };
    return user;
  }
};
