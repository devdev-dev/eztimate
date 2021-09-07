import { PullOperator } from 'mongodb';
import { Issue, IssueState, MutationResolvers, User } from '../../../generated/graphql';
import { DatabaseError } from '../../../pages/api/graphql';
import { getObjectId } from '../../mongo';

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
  updateActiveIssue: async (_, { name, state }, { db, issueId }) => {
    let update = {};
    if (name !== undefined) update = { ...update, name: name };
    if (state !== undefined) update = { ...update, state: state };
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
  createEstimateActiveIssue: async (_, { value }, { db, issueId, userId }) => {
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
  deleteEstimateActiveIssue: async (_, { id }, { db, issueId }) => {
    const estimateObjectId = getObjectId(id);

    const { value } = await db.collection('issues').findOneAndUpdate(
      { _id: issueId },
      { $pull: { estimates: estimateObjectId } as PullOperator<Document> },
      {
        returnDocument: 'after'
      }
    );

    db.collection('estimates').deleteOne({ _id: estimateObjectId });
    return value as Issue;
  },
  createUser: async (_, {}, { db }) => {
    const { insertedId } = await db.collection('users').insertOne({});
    const user: User = { _id: insertedId.toHexString() };
    return user;
  }
};
