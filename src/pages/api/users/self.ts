import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { connectDatabase, getObjectId } from '../../../utils/mongodb/mongodb';
import { UTeam, UUser } from '../../../utils/types';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { client, db } = await connectDatabase();
  const session = await getSession({ req: request });

  if (!session) {
    response.status(400).send({ error: 'UNAUTHORIZED' });
    return;
  }

  const loggedInUserID = getObjectId(session.user.id);
  if (loggedInUserID) {
    const loggedInUser = await db.collection('users').findOne({ _id: loggedInUserID });

    const returnUUser: UUser = {
      id: loggedInUser._id as string,
      email: loggedInUser.email as string,
      teams: (await db
        .collection('teams')
        .find({ _id: { $in: loggedInUser.teams } })
        .toArray()) as UTeam[]
    };

    if (loggedInUser) {
      response.status(200).send(returnUUser);
    } else {
      response.status(400).send({ error: 'DATABASE_ERROR' });
    }
  } else {
    response.status(400).send({ error: 'INVALID_USER_ID' });
  }

  client.close();
};
