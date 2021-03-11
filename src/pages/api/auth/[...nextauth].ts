import isEqual from 'lodash/isEqual';
import isUndefined from 'lodash/isUndefined';
import NextAuth, { InitOptions } from 'next-auth';
import Providers from 'next-auth/providers';
import { TeamSession } from '../../../utils/types';

declare global {
  namespace NodeJS {
    interface Global {
      teamSession: TeamSession;
    }
  }
}

const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    Providers.Email({
      server: {
        port: 465,
        host: 'mxf9ba.netcup.net',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    })
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60
  },
  callbacks: {
    async signIn() {
      console.log('signIn');
      return true;
    },
    async redirect(_, baseUrl) {
      console.log('redirect');
      return baseUrl;
    },
    async session(session, user) {
      console.log('session');
      session.user.objectID = user.objectID;
      session.user.teamSession = user.teamSession;

      return session;
    },
    async jwt(token, user) {
      console.log('jwt');

      if (user) {
        console.log('init jwt');
        token.objectID = user.id;
        token.teamSession = null;
      }

      if (!isUndefined(global.teamSession) && !isEqual(global.teamSession, token.teamSession)) {
        token.teamSession = global.teamSession;
      }

      return token;
    }
  },
  database: process.env.MONGODB_URI + process.env.MONGODB_DB,
  debug: process.env.IS_PROD === 'false'
};

export default (req, res) => NextAuth(req, res, options as InitOptions);
