import { IResolvers } from '@graphql-tools/utils';
import { Estimate, EstimateValue, User } from '../../../generated/graphql';

export const resolvers: IResolvers = {
  Estimate: {
    values(estimate: Estimate, args, { db }): EstimateValue[] {
      return [];
    }
  },
  EstimateValue: {
    user(estimate: EstimateValue, args, { db }): User {
      return { _id: '123' };
    }
  }
};
