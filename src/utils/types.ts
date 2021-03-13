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
  id: string;
  name: string;
}
export interface UUsers {
  id: string;
  email: string;
}
export interface UIssues {
  id: string;
  name: string;
  state: IssueState;
  estimate: string;
}
