import NextAuth, { JWT, NextAuthOptions, Session, User } from 'next-auth';
import Providers from 'next-auth/providers';
import { WithAdditionalParams } from 'next-auth/_utils';

const options: NextAuthOptions = {
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
    async session(session: Session, userOrToken: User | JWT) {
      session.user.id = userOrToken.id;
      return session as WithAdditionalParams<Session>;
    },
    async jwt(token, user: User) {
      if (user) {
        token.id = user.id;
      }

      return token;
    }
  },
  database: process.env.MONGODB_URI + process.env.MONGODB_DB
};

export default (req, res) => NextAuth(req, res, options);
