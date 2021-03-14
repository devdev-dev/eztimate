export const mutateJoinTeam = teamId => fetch('/api/team/join', teamId);

export const mutateCreateTeam = teamName => fetch('/api/team/create', teamName);

export const mutateCreateIssue = issueName => fetch('/api/app/issue-create', issueName);

export const mutateSetActiveIssue = issueId => fetch('/api/app/issue-set-active', issueId);

export const queryIssuesAction = () => fetch('/api/app/issues').then(res => res.json());

export const queryTeamAction = () => fetch('/api/app/team').then(res => res.json());

export const queryUsersAction = () => fetch('/api/app/users').then(res => res.json());
