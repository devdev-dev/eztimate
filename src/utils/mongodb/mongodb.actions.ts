export const joinTeamMutation = teamId => fetch('/api/team/join', teamId);

export const createTeamMutation = teamName => fetch('/api/team/create', teamName);

export const createIssueMutation = issueName => fetch('/api/app/issue-create', issueName);

export const setActiveIssuesMutation = issueId => fetch('/api/app/issue-set-active', issueId);

export const issueQuery = () => fetch('/api/app/issues').then(res => res.json());

export const teamQuery = () => fetch('/api/app/team').then(res => res.json());

export const userByTeamQuery = () => fetch('/api/users/team').then(res => res.json());

export const userSelfQuery = () => fetch('/api/users/team').then(res => res.json());
