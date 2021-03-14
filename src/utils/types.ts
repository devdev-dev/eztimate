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
  _id: string;
  name: string;
}
export interface UUser {
  _id: string;
  email: string;
}
export interface UIssue {
  _id: string;
  name: string;
  state: IssueState;
  estimate: string;
}
