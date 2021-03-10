import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { connectToDatabase, getObjectId } from '../../../utils/mongodb/mongodb';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const session = await getSession({ req: request });

  if (!session) {
    response.status(400).send({ error: 'UNAUTHORIZED' });
    return;
  }

  const result = await db.collection('teams').insertOne({
    name: request.body.teamId,
    members: [getObjectId((session.user as any).objectID)]
  });

  if (result) {
    response.status(200).send({ teamId: result.insertedId });
  } else {
    response.status(400).send({ error: 'SESSION_NOT_CREATED' });
  }
};
