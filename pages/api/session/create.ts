import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/mongodb';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { db } = await connectToDatabase();

  const result = await db.collection('sessions').insertOne({
    name: request.body.sessionName
  });

  response.statusCode = 200;
  response.json({ session_id: result.insertedId });
  response.end();
};
