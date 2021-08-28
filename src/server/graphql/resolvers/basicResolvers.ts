import { IResolvers } from '@graphql-tools/utils';
import { Estimate, EstimateValue, User } from '../../../generated/graphql';

export const resolvers: IResolvers = {
  Estimate: {
    async values(estimate: Estimate, args, { db }): Promise<EstimateValue[]> {
      return [];
    }
  },
  EstimateValue: {
    async user(estimate: EstimateValue, args, { db }): Promise<User> {
      return { _id: '123' };
    }
  }
};
