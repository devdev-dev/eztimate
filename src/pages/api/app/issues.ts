import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { connectDatabase, getObjectId } from '../../../utils/mongodb/mongodb';
import { CookieName } from '../../../utils/types';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { client, db } = await connectDatabase();
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
    const team = await db.collection('teams').findOne({ _id: teamIdObject });
    const issues = await db
      .collection('issues')
      .find({ _id: { $in: team.issues } })
      .sort({ dateCreated: -1 })
      .toArray();

    if (issues) {
      response.status(200).send(issues);
    } else {
      response.status(400).send({ error: 'DATABASE_ERROR' });
    }
  } else {
    response.status(400).send({ error: 'INVALID_TEAM_ID' });
  }

  client.close();
};
