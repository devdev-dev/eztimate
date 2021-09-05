import { Db, ObjectId } from 'mongodb';

export type ResolverContext = {
  db: Db;
  userId: ObjectId;
  issueId: ObjectId;
};
