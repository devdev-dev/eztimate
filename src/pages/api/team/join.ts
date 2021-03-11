import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { connectToDatabase, getObjectId } from '../../../utils/mongodb/mongodb';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { db: database } = await connectToDatabase();

  const teamIdObject = getObjectId(request.body.teamId);
  if (teamIdObject) {
    const result = await database.collection('teams').findOne({ _id: teamIdObject });

    if (result) {
      await storeTeamIdInSession(request.body.teamId, request);
      response.status(200).end();
    } else {
      response.status(400).send({ error: 'SESSION_NOT_FOUND' });
    }
  } else {
    response.status(400).send({ error: 'SESSION_ID_INVALID' });
  }
};

async function storeTeamIdInSession(teamId: string, request: NextApiRequest) {
  global.teamSession = teamId;
  await getSession({ req: request });
}
