import { IResolvers } from '@graphql-tools/utils';
import { Estimate } from '../../../generated/graphql';

export const resolvers: IResolvers = {
  Query: {
    async getActiveEstimate(parent, args, { db, estimateId }): Promise<Estimate> {
      return await db.collection('estimates').findOne({ _id: estimateId });
    }
  }
};
