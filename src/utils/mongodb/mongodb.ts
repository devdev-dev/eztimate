import { MongoClient, ObjectID } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!process.env.MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

export async function connectDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = await client.db(process.env.MONGODB_DB);

  return { client, db };
}

export function getObjectId(objectId: string): ObjectID | undefined {
  return ObjectID.isValid(objectId) ? new ObjectID(objectId) : undefined;
}
