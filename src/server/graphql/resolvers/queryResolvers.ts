import { IResolvers } from '@graphql-tools/utils';
import { Estimate, EstimateState } from '../../../generated/graphql';

export const resolvers: IResolvers = {
  Query: {
    getActiveEstimate(parent, args, context): Estimate {
      console.log('resolving query');
      return { _id: '', state: EstimateState.Collect, values: [] };
    }
  }
};
