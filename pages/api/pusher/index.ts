import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';
import Pusher from 'pusher';
import { CookieName } from '../../../src/cookies';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const userId = new Cookies(request, response).get(CookieName.USER_ID);
  const estimateId = new Cookies(request, response).get(CookieName.ISSUE_ID);

  if (!userId) {
    response.status(403).send({ error: 'NO_USER_ID' });
    return;
  }

  if (!estimateId) {
    response.status(403).send({ error: 'NO_ESTIMATION_ID' });
    return;
  }

  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
  });

  const { channelName, eventName, data } = JSON.parse(request.body);
  await pusher.trigger(channelName, eventName, data, {
    socket_id: data.socketId
  });

  response.status(200).send({});
};
