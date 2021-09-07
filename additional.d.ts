import { MongoClient } from 'mongodb';
import Pusher from 'pusher';

declare global {
  var mongo: { client?: MongoClient };
  var pusher: Pusher;
}
