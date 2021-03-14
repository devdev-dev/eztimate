import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { connectDatabase, getObjectId } from '../../../utils/mongodb/mongodb';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { client, db } = await connectDatabase();
  const session = await getSession({ req: request });

  if (!session) {
    response.status(400).send({ error: 'UNAUTHORIZED' });
    return;
  }
  const loggedInUserID = getObjectId(session.user.id);

  const { insertedId: insertedTeamId } = await db.collection('teams').insertOne({
    name: request.body.teamName,
    users: [loggedInUserID]
  });

  await db.collection('users').updateOne(
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

  client.close();
};
