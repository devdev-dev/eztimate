import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
  }
  interface JWT {
    id: string;
  }
}
