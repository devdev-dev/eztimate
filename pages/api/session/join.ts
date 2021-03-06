// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from '../../../utils/cookies';

const handler = (request: NextApiRequest, response: NextApiResponse) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = 'mongodb+srv://admin:Yt353h5&p9bfzofwU@cluster0.k6eo6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    client.connect(error => {
      if (error) {
        console.error(error);
      } else {
        console.log(`Got Connected with ${JSON.stringify(request.body)}`);
        // client.db('eztimate').collection('sessions').insertOne({
        //   name: 'First Session'
        // });
      }
    });
  } finally {
    client.close();
  }

  setCookie(response, 'session_id', 'id');
  response.end(response.getHeader('Set-Cookie'));
};

export default handler;
,0
