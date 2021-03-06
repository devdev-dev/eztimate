// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from '../../../utils/cookies';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const MongoClient = require('mongodb').MongoClient;
  const uri = 'mongodb+srv://admin:Yt353h5&p9bfzofwU@cluster0.k6eo6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    client.connect(error => {
      if (error) {
        console.error(error);
      } else {
        console.log('Got Connected');
        // client.db('eztimate').collection('sessions').insertOne({
        //   name: 'First Session'
        // });
      }
    });
  } finally {
    client.close();
  }

  setCookie(res, 'session_id', 'id');
  res.end(res.getHeader('Set-Cookie'));
};

export default handler;
