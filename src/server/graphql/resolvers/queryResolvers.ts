import { IResolvers } from '@graphql-tools/utils';
import { Estimate, EstimateState } from '../../../generated/graphql';

export const resolvers: IResolvers = {
  Query: {
    async getActiveEstimate(parent, args, context): Promise<Estimate> {
      return { _id: '', state: EstimateState.Collect, values: [] };
    }
  }
};
