import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase, getObjectId } from '../../../utils/mongodb';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { db: database } = await connectToDatabase();

  const sessionIdObject = getObjectId(request.body.sessionId);
  if (sessionIdObject) {
    const result = await database.collection('sessions').findOne({ _id: sessionIdObject });

    if (result) {
      response.status(200).send({ sessionId: result });
    } else {
      response.status(400).send({ error: 'SESSION_NOT_FOUND' });
    }
  } else {
    response.status(400).send({ error: 'SESSION_ID_INVALID' });
  }
};
