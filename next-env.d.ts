/// <reference types="next" />
/// <reference types="next/types/global" />

import { MongoClient } from 'mongodb';
import Pusher from 'pusher';

declare global {
  declare module NodeJS {
    interface Global {
      mongo: { client?: MongoClient };
      pusher: Pusher;
    }
  }
}
