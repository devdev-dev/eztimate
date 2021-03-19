import { gql } from '@apollo/client';

export const ACTIVE_TEAM_QUERY = gql`
  query ActiveTeamQuery {
    activeTeam {
      _id
      name
      estimatedIssue
      __typename
      issues {
        _id
        name
        state
        __typename
      }
    }
  }
`;

export const GET_TEAM_USERS_QUERY = gql`
  query GetUsers {
    activeTeam {
      users {
        _id
        email
        __typename
      }
    }
  }
`;

export const ISSUE_CREATE_MUTATION = gql`
  mutation IssueCreate($issueId: String!) {
    issueCreate(issueId: $issueId) {
      _id
      __typename
    }
  }
`;

export const ISSUE_ESTIMATE_MUTATION = gql`
  mutation IssueEstimate($issueId: String!) {
    issueEstimate(issueId: $issueId) {
      _id
      __typename
    }
  }
`;

export const ISSUE_DELETE_MUTATION = gql`
  mutation IssueDelete($issueId: String!) {
    issueDelete(issueId: $issueId)
  }
`;
