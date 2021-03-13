import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { connectToDatabase, getObjectId } from '../../../utils/mongodb/mongodb';
import { CookieName } from '../../../utils/types';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { db: database } = await connectToDatabase();
  const session = await getSession({ req: request });
  const teamId = new Cookies(request, response).get(CookieName.TEAM_ID);

  if (!session) {
    response.status(400).send({ error: 'UNAUTHORIZED' });
    return;
  } else if (!teamId) {
    response.status(400).send({ error: 'NO_ACTIVE_TEAM_ID' });
    return;
  }

  const teamIdObject = getObjectId(teamId);
  if (teamIdObject) {
    const team = await database.collection('teams').findOne({ _id: teamIdObject });

    if (team) {
      response.status(200).send(team);
    } else {
      response.status(400).send({ error: 'DATABASE_ERROR' });
    }
  } else {
    response.status(400).send({ error: 'INVALID_TEAM_ID' });
  }
};
