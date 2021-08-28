import { MongoClient, ObjectId } from 'mongodb';

global.mongo = global.mongo || {};

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!process.env.MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

export default async function getDatabase() {
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await global.mongo.client.connect();
  }

  return { client: global.mongo, db: global.mongo.client.db(process.env.MONGODB_DB) };
}

export function getObjectId(objectId: string | undefined): ObjectId | undefined {
  return ObjectId.isValid(objectId ?? 'invalid') ? new ObjectId(objectId) : undefined;
}
