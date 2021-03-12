import { Action } from 'react-fetching-library';

export const JoinTeamAction = data =>
  ({
    method: 'POST',
    endpoint: '/api/team/join',
    body: data
  } as Action);

export const CreateTeamAction = data =>
  ({
    method: 'POST',
    endpoint: '/api/team/create',
    body: data
  } as Action);
