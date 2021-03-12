import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { connectToDatabase, getObjectId } from '../../../utils/mongodb/mongodb';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { db: database } = await connectToDatabase();
  const session = await getSession({ req: request });

  if (!session) {
    response.status(400).send({ error: 'UNAUTHORIZED' });
    return;
  }
  const loggedInUserID = getObjectId((session.user as any).objectID);

  const { insertedId: insertedTeamId } = await database.collection('teams').insertOne({
    name: request.body.teamName,
    members: [loggedInUserID]
  });

  await database.collection('users').updateOne(
    { _id: loggedInUserID },
    {
      $addToSet: {
        teams: insertedTeamId
      }
    }
  );

  if (insertedTeamId) {
    response.status(200).send({ teamId: insertedTeamId });
  } else {
    response.status(400).send({ error: 'SESSION_NOT_CREATED' });
  }
};