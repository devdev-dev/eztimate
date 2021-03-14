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

  const teamIdObject = getObjectId(request.body.teamId);
  if (teamIdObject) {
    const result = await db.collection('teams').findOne({ _id: teamIdObject });

    if (result) {
      const loggedInUserID = getObjectId(session.user.id);
      await db.collection('users').updateOne(
        { _id: loggedInUserID },
        {
          $addToSet: {
            teams: teamIdObject
          }
        }
      );
      await db.collection('teams').updateOne(
        { _id: teamIdObject },
        {
          $addToSet: {
            users: loggedInUserID
          }
        }
      );

      response.status(200).send({ teamId: request.body.teamId });
    } else {
      response.status(400).send({ error: 'SESSION_NOT_FOUND' });
    }
  } else {
    response.status(400).send({ error: 'SESSION_ID_INVALID' });
  }

  client.close();
};
