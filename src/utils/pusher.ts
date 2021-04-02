import Pusher from 'pusher';

global.pusher = global.pusher || undefined;

if (!process.env.PUSHER_APP_ID) {
  throw new Error('Please define the PUSHER_APP_ID environment variable inside .env.local');
}

if (!process.env.PUSHER_APP_KEY) {
  throw new Error('Please define the MONPUSHER_APP_KEYGODB_DB environment variable inside .env.local');
}

if (!process.env.PUSHER_APP_SECRET) {
  throw new Error('Please define the PUSHER_APP_SECRET environment variable inside .env.local');
}

export default function getPusher(): Pusher {
  if (global.pusher) return global.pusher;

  return new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: 'eu'
  });
}
