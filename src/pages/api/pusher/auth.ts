import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';
import Pusher, { PresenceChannelData } from 'pusher';
import { CookieName } from '../../../cookies';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
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

  try {
    const socketId = request.body.socket_id;
    const channel = request.body.channel_name;

    const presenceData: PresenceChannelData = { user_id: userId };
    const auth = pusher.authenticate(socketId, channel, presenceData);

    return response.send(auth);
  } catch (err) {
    console.log('Pusher Auth Error: ', err);
    response.status(403).end();
  }
};

export default handler