import { Action } from 'react-fetching-library';

export const joinSessionAction = data =>
  ({
    method: 'POST',
    endpoint: '/api/team/join',
    body: data
  } as Action);

export const createSessionAction = data =>
  ({
    method: 'POST',
    endpoint: '/api/team/create',
    body: data
  } as Action);
