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
  const issueIdObject = getObjectId(request.body.issueId);
  if (teamIdObject && issueIdObject) {
    await db.collection('teams').updateOne(
      { _id: teamIdObject },
      {
        $set: {
          activeIssue: issueIdObject
        }
      }
    );

    response.status(200).send({});
  } else {
    response.status(400).send({ error: 'INVALID_TEAM_ID || INVALID_ISSUE_ID' });
  }

  client.close();
};
