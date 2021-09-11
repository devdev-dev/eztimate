import { PullOperator } from 'mongodb';
import { Issue, IssueState, MutationResolvers, User } from '../../../generated/graphql';
import { DatabaseError } from '../../../pages/api/graphql';

export const mutationResolvers: MutationResolvers = {
  createActiveIssue: async (_, {}, { db }) => {
    const { insertedId } = await db.collection('issues').insertOne({
      name: 'New Issue',
      state: IssueState.COLLECT,
      stack: ['1', '2', '3', '5', '8', '13', '?'],
      estimates: []
    });

    const issue: Issue = {
      _id: insertedId.toHexString(),
      name: 'New Issue',
      state: IssueState.COLLECT,
      stack: ['1', '2', '3', '5', '8', '13', '?'],
      estimates: []
    };
    return issue;
  },
  updateActiveIssue: async (_, { name, state, stack }, { db, issueId }) => {
    let update = {};
    if (name !== undefined) update = { ...update, name: name };
    if (state !== undefined) update = { ...update, state: state };
    if (stack !== undefined) update = { ...update, stack: stack };
    return (
      await db.collection('issues').findOneAndUpdate(
        { _id: issueId },
        {
          $set: update
        },
        { returnDocument: 'after' }
      )
    ).value as Issue;
  },
  resetActiveIssue: async (_, {}, { db, issueId }) => {
    const dbIssue = (
      await db.collection('issues').findOneAndUpdate(
        { _id: issueId },
        {
          $set: {
            name: 'New Issue',
            state: IssueState.COLLECT,
            estimates: []
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
  updateUserEstimate: async (_, { value }, { db, issueId, userId }) => {
    if (value) {
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
    } else {
      const { value: deletedDbEstimate } = await db.collection('estimates').findOneAndDelete({ user: userId });

      if (deletedDbEstimate) {
        const { value: dbIssue } = await db.collection('issues').findOneAndUpdate(
          { _id: issueId },
          { $pull: { estimates: deletedDbEstimate._id } as PullOperator<Document> },
          {
            returnDocument: 'after'
          }
        );
        return dbIssue as Issue;
      } else {
        throw new DatabaseError('Create / Update estimate not possible. ');
      }
    }
  },
  createUser: async (_, {}, { db }) => {
    const { insertedId } = await db.collection('users').insertOne({});
    const user: User = { _id: insertedId.toHexString() };
    return user;
  }
};
