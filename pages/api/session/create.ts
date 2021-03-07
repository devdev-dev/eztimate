import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/mongodb';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { db } = await connectToDatabase();

  const result = await db.collection('sessions').insertOne({
    name: request.body.sessionName
  });

  if (result) {
    response.status(200).send({ teamId: result.insertedId });
  } else {
    response.status(400).send({ error: 'SESSION_NOT_CREATED' });
  }
};
