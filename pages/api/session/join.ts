import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase, getObjectId } from '../../../utils/mongodb/mongodb';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { db: database } = await connectToDatabase();

  const teamIdObject = getObjectId(request.body.teamId);
  if (teamIdObject) {
    const result = await database.collection('teams').findOne({ _id: teamIdObject });

    if (result) {
      response.status(200).send({ teamId: result._id });
    } else {
      response.status(400).send({ error: 'SESSION_NOT_FOUND' });
    }
  } else {
    response.status(400).send({ error: 'SESSION_ID_INVALID' });
  }
};
