import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { basicResolvers, mutationResolvers, queryResolvers } from './resolvers';
import * as typeDefs from './schema.graphql';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers: { ...basicResolvers, ...queryResolvers, ...mutationResolvers }
});

export default schema;
