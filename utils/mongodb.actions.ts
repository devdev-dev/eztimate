import { Action } from 'react-fetching-library';

export const joinSessionAction = data =>
  ({
    method: 'POST',
    endpoint: '/api/session/join',
    body: data
  } as Action);

export const createSessionAction = data =>
  ({
    method: 'POST',
    endpoint: '/api/session/create',
    body: data
  } as Action);
