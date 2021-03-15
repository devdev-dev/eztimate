import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Query {
    loggedInUser: User
  }
  type User {
    _id: String!
    email: String
    teams: [Team]!
  }
  type Team {
    _id: String!
    name: String!
    users: [User]!
  }
`;
