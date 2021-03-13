import { Action } from 'react-fetching-library';

export const CreateTeamAction = data =>
  ({
    method: 'POST',
    endpoint: '/api/team/create',
    body: data
  } as Action);

export const JoinTeamAction = data =>
  ({
    method: 'POST',
    endpoint: '/api/team/join',
    body: data
  } as Action);

export const FetchTeamAction = {
  method: 'GET',
  endpoint: '/api/app/team'
} as Action;

export const FetchUsersAction = {
  method: 'GET',
  endpoint: '/api/app/users'
} as Action;

export const CreateIssueAction = data =>
  ({
    method: 'POST',
    endpoint: '/api/app/issue-create',
    body: data
  } as Action);
