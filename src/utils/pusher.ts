import Pusher from 'pusher';

global.pusher = global.pusher || undefined;

if (!process.env.PUSHER_APP_ID) {
  throw new Error('Please define the PUSHER_APP_ID environment variable inside .env.local');
}

if (!process.env.PUSHER_KEY) {
  throw new Error('Please define the PUSHER_KEY environment variable inside .env.local');
}

if (!process.env.PUSHER_SECRET) {
  throw new Error('Please define the PUSHER_SECRET environment variable inside .env.local');
}

if (!process.env.PUSHER_CLUSTER) {
  throw new Error('Please define the PUSHER_CLUSTER environment variable inside .env.local');
}

export default function getPusher(): Pusher {
  if (global.pusher) return global.pusher;

  global.pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
  });

  return global.pusher;
}
