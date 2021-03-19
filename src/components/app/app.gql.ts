import { gql } from '@apollo/client';

export const ACTIVE_TEAM_QUERY = gql`
  query ActiveTeamQuery {
    activeTeam {
      _id
      name
      estimatedIssue
      issues {
        _id
        name
        state
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
      }
    }
  }
`;

export const ISSUE_CREATE_MUTATION = gql`
  mutation IssueCreate($issueId: String!) {
    issueCreate(issueId: $issueId) {
      _id
    }
  }
`;

export const ISSUE_ESTIMATE_MUTATION = gql`
  mutation IssueEstimate($issueId: String!) {
    issueEstimate(issueId: $issueId) {
      _id
    }
  }
`;

export const ISSUE_DELETE_MUTATION = gql`
  mutation IssueDelete($issueId: String!) {
    issueDelete(issueId: $issueId)
  }
`;
