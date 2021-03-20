export const JoinTeamMutation = teamId =>
  fetch('/api/team/join', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(teamId)
  });

export const CreateTeamMutation = teamName =>
  fetch('/api/team/create', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(teamName)
  });

export const CreateIssueMutation = name =>
  fetch('/api/app/issue-create', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(name)
  });

export const SetActiveIssuesMutation = id =>
  fetch('/api/app/issue-set-active', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(id)
  });

export const IssueQuery = () => fetch('/api/app/issues').then(res => res.json());

export const TeamQuery = () => fetch('/api/app/team').then(res => res.json());

export const UserByTeamQuery = () => fetch('/api/users/team').then(res => res.json());

export const UserSelfQuery = () => fetch('/api/users/self').then(res => res.json());
