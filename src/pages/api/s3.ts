import aws from 'aws-sdk';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const reqForm: any = await new Promise((resolve, reject) => {
    const form = new IncomingForm({ keepExtensions: true, multiples: false });
    form.parse(req, (err: any, fields: any, files: any) => {
      if (err) return reject(err);
      fs.readFile(files.avatar.path, function (fsErr, data) {
        if (fsErr) return reject(fsErr);
        resolve({ name: fields.name, file: files.avatar, data, oldiamge: fields.oldimage });
      });
    });
  });

  aws.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: process.env.S3_REGION,
    signatureVersion: 'v4'
  });

  const awsInstance = new aws.S3();

  await awsInstance.upload(
    {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: reqForm.name + '.jpeg',
      Body: reqForm.data,
      ACL: 'public-read'
    },
    function (s3Err, data) {
      if (s3Err) throw s3Err;

      if (reqForm.oldiamge) {
        awsInstance.deleteObject(
          {
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: reqForm.oldiamge.substring(reqForm.oldiamge.lastIndexOf('/') + 1)
          },
          s3DeleteErr => {
            if (s3DeleteErr) throw s3DeleteErr;
          }
        );
      }

      res.status(200).json({ url: data.Location });
    }
  );
}
