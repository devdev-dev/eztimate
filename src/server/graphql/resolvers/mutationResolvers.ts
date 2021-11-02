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
  updateActiveIssue: async (_, { input }, { db, issueId }) => {
    let update = {};
    if (input.name !== undefined) update = { ...update, name: input.name };
    if (input.state !== undefined) update = { ...update, state: input.state };
    if (input.stack !== undefined) update = { ...update, stack: input.stack };
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
            name: '',
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
  updateActiveUser: async (_, { input }, { db, userId }) => {
    let update = {};
    if (input.avatar !== undefined) update = { ...update, avatar: input.avatar };
    if (input.name !== undefined) update = { ...update, name: input.name };

    const { value } = await db.collection('users').findOneAndUpdate(
      { _id: userId },
      {
        $set: update
      },
      { returnDocument: 'after' }
    );

    return value as User;
  }
};
