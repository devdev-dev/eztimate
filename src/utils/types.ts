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
  users: UUsers[];
}
export interface UTeam {
  _id: string;
  name: string;
}
export interface UUsers {
  _id: string;
  email: string;
}
export interface UIssues {
  _id: string;
  name: string;
  state: IssueState;
  estimate: string;
}
