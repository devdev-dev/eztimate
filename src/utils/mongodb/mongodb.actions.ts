export const JoinTeamMutation = teamId => fetch('/api/team/join', teamId);

export const CreateTeamMutation = teamName => fetch('/api/team/create', teamName);

export const CreateIssueMutation = issueName => fetch('/api/app/issue-create', issueName);

export const SetActiveIssuesMutation = issueId => fetch('/api/app/issue-set-active', issueId);

export const IssueQuery = () => fetch('/api/app/issues').then(res => res.json());

export const TeamQuery = () => fetch('/api/app/team').then(res => res.json());

export const UserByTeamQuery = () => fetch('/api/users/team').then(res => res.json());

export const UserSelfQuery = () => fetch('/api/users/self').then(res => res.json());
