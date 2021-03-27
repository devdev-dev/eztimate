import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import Pusher from 'pusher';
import { CookieName } from '../../../utils/types';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const session = await getSession({ req: request });
  const teamId = new Cookies(request, response).get(CookieName.TEAM_ID);

  if (!session) {
    response.status(403).send({ error: 'UNAUTHORIZED' });
    return;
  } else if (!teamId) {
    response.status(403).send({ error: 'NO_ACTIVE_TEAM_ID' });
    return;
  }

  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: 'eu'
  });

  const { channelName, eventName, data } = JSON.parse(request.body);
  pusher.trigger(channelName, eventName, data, {
    socket_id: data.socketId
  });

  response.status(200).send({});
};
