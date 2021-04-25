import { IResolvers } from 'graphql-tools';
import { Estimate, Issue, Team, User } from '../types.grapqhl';

export const resolvers: IResolvers = {
  User: {
    async teams(user: User, args, { db }) {
      const teams = await db
        .collection('teams')
        .find({ _id: { $in: user.teams } })
        .toArray();

      return teams;
    }
  },
  Team: {
    async users(team: Team, args, { db }) {
      const users = await db
        .collection('users')
        .find({ _id: { $in: team.users } })
        .toArray();

      return users;
    },
    async issues(team: Team, args, { db }) {
      const issues = await db
        .collection('issues')
        .find({ _id: { $in: team.issues } })
        .sort({ dateCreated: -1 })
        .toArray();

      return issues;
    },
    async estimatedIssue(team: Team, args, { db }) {
      const issue = await db.collection('issues').findOne({ _id: team.estimatedIssue });
      return issue;
    }
  },
  Issue: {
    async estimates(issue: Issue, args, { db }) {
      if (issue.estimates) {
        return await db
          .collection('estimates')
          .find({ _id: { $in: issue.estimates ?? [] } })
          .toArray();
      }
      return [];
    }
  },
  Estimate: {
    async user(estimate: Estimate, args, { db }) {
      const user = await db.collection('users').findOne({ _id: estimate.user });
      return user;
    }
  }
};
