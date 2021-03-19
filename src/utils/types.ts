export enum CookieName {
  TEAM_ID = 'teamId'
}

export enum IssueState {
  OPEN = 'open',
  ESTIMATED = 'estimated',
  UNFINISHED = 'unfinished'
}
export interface UApp {
  team: UTeam;
  users: UUser[];
}
export interface UTeam {
  id: string;
  name: string;
  dateCreated: number;
  estimatedIssue: string;
}
export interface UUser {
  id: string;
  email: string;
  teams: UTeam[];
}
export interface UIssue {
  id: string;
  name: string;
  state: IssueState;
  estimate: string;
}
