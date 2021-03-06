import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from '../../../utils/cookies';
import { connectToDatabase } from '../../../utils/mongodb';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { db } = await connectToDatabase();

  const result = await db.collection('sessions').insertOne({
    name: request.body.sessionName
  });

  setCookie(response, 'session_id', result.insertedId);

  response.statusCode = 200;
  response.json({ session_id: result.insertedId });
  response.getHeader('Set-Cookie');
  response.end();
};
