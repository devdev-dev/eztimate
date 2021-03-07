import { ObjectID } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/mongodb';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { db } = await connectToDatabase();

  const result = await db.collection('sessions').findOne({ _id: new ObjectID(request.body.sessionId) });

  if (result) {
    response.status(200).send({ sessionId: result });
  } else {
    response.status(400).send({ error: 'SESSION_NOT_FOUND' });
  }
};
