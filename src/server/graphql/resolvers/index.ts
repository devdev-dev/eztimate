import { Resolvers } from '../../../generated/graphql';
import { estimateResolvers, issueResolvers } from './basicResolvers';
import { mutationResolvers } from './mutationResolvers';
import { queryResolvers } from './queryResolvers';

export const resolvers: Resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Issue: issueResolvers,
  Estimate: estimateResolvers
};
