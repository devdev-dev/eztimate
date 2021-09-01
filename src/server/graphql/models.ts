import { Db } from 'mongodb';

export type ResolverContext = {
  db: Db;
  userId: string;
  issueId: string;
};