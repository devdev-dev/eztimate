import isNull from 'lodash/isNull';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { SessionUser } from '../../../utils/types';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  global.teamSession = null;
  const session = await getSession({ req: request });

  if (isNull((session.user as SessionUser).teamSession)) {
    response.status(200).end();
  } else {
    response.status(400).send({ error: 'SESSION_NOT_MODIFIED' });
  }
};
