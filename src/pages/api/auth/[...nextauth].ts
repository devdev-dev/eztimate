import NextAuth, { InitOptions, User } from 'next-auth';
import Providers from 'next-auth/providers';
import { SessionBase } from 'next-auth/_utils';

const options: InitOptions = {
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
      return true;
    },
    async redirect(_, baseUrl) {
      return baseUrl;
    },
    async session(sessionBase: SessionBase, user: User) {
      sessionBase.user.id = user.id;

      return sessionBase;
    },
    async jwt(token, user: User) {
      if (user) {
        token.id = user.id;
      }

      return token;
    }
  },
  database: process.env.MONGODB_URI + process.env.MONGODB_DB,
  debug: process.env.IS_PROD === 'false'
};

export default (req, res) => NextAuth(req, res, options);
