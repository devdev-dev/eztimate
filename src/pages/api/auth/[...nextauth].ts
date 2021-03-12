import NextAuth, { InitOptions } from 'next-auth';
import Providers from 'next-auth/providers';

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
      return true;
    },
    async redirect(_, baseUrl) {
      return baseUrl;
    },
    async session(session, user) {
      session.user.objectID = user.objectID;

      return session;
    },
    async jwt(token, user) {
      if (user) {
        token.objectID = user.id;
        token.teamSession = null;
      }

      return token;
    }
  },
  database: process.env.MONGODB_URI + process.env.MONGODB_DB,
  debug: process.env.IS_PROD === 'false'
};

export default (req, res) => NextAuth(req, res, options as InitOptions);
