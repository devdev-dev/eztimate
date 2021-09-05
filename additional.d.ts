import { MongoClient } from 'mongodb';

declare global {
  var mongo: { client?: MongoClient };
}
