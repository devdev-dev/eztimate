/// <reference types="next" />
/// <reference types="next/types/global" />

import {MongoClient} from 'mongodb';

declare global {
    declare module NodeJS {
        interface Global {
            mongo: { client?: MongoClient };
        }
    }
}
