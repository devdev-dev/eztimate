import { IResolvers } from '@graphql-tools/utils';
import { Estimate, EstimateValue, User } from '../../../generated/graphql';

export const resolvers: IResolvers = {
  Estimate: {
    values(estimate: Estimate): EstimateValue[] {
      return estimate.values;
    }
  },
  EstimateValue: {
    async user(estimateValue: EstimateValue, args, { db }): Promise<User> {
      return await db.collection('users').findOne({ _id: estimateValue.user });
    }
  }
};
