export enum CookieName {
  TEAM_ID = 'teamId'
}

export enum PusherEvents {
  IllegalState = 'app:illegalstate',
  TeamUpdate = 'team:update',
  UserUpdate = 'user:update',
  UserJoinTeam = 'user:join',
  IssueCreate = 'issue:create',
  IssueUpdate = 'issue:update',
  IssueDelete = 'issue:delete',
  EstimateCreate = 'estimate:create',
  EstimateDelete = 'estimate:delete'
}

export const defaultCardSet = ['1', '2', '3', '5', '8', '13'];
