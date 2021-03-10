import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    Providers.Email({
      server: {
        port: 465,
        host: 'mxf9ba.netcup.net',
        secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
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
      console.log('signin \n');
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
      }
      return token;
    }
  },
  database: process.env.MONGODB_URI + process.env.MONGODB_DB,
  debug: process.env.IS_PROD
};

export default (req, res) => NextAuth(req, res, options);
