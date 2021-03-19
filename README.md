# The Eztimate App

## Getting Started

1. Install all dependencies and generate the required graphql type files:

   ```bash
   npm run install
   npm run codegen
   ```

2. Duplicate the .env.example file and name it .env.local

   Fill in all the required fields for development. you will need:

   - A working mail server
   - A mongodb database (local or remote - I prefer MongoDb Atlas)
   - IS_PROD should be set to `false`

3. Then, run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Client Side Development

You can start editing the page by modifying any files e.g. `pages/index.js`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages. The `/api/auth/[...nextauth].ts` route is necessary for the `next-auth` package.

As we use graphql there is only one route `/api/graphql` for most of our requests.

## Server Side Development

This app is created with serverless functions. Most of the logic is found within the `pages/api` folder. This app uses graphql. The relevant graphql schema and resolver files are found in `/apollo`. To add new graphql queries or mutations you have to extend the schema and resolver file.

## Disclaimer

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
