import { gql } from '@apollo/client';

export const USER_CREATE_TEAM_MUTATION = gql`
  mutation CreateTeam($teamName: String!) {
    teamCreate(teamName: $teamName) {
      _id
      __typename
    }
  }
`;

export const USER_JOIN_TEAM_MUTATION = gql`
  mutation UserJoinTeam($teamId: String!) {
    userJoinTeam(teamId: $teamId) {
      _id
      __typename
    }
  }
`;

export const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUser {
    loggedInUser {
      _id
      __typename
      teams {
        _id
        name
        __typename
        users {
          email
          __typename
        }
      }
    }
  }
`;
