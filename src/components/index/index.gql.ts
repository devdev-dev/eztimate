import { gql } from '@apollo/client';

export const TEAM_CREATE_MUTATION = gql`
  mutation CreateTeam($teamName: String!) {
    teamCreate(teamName: $teamName) {
      _id
    }
  }
`;

export const USER_JOIN_TEAM_MUTATION = gql`
  mutation UserJoinTeam($teamId: String!) {
    userJoinTeam(teamId: $teamId) {
      _id
    }
  }
`;

export const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUser {
    loggedInUser {
      _id
      teams {
        _id
        name
        users {
          email
        }
      }
    }
  }
`;
