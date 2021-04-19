import aws from 'aws-sdk';
import { IncomingForm } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  const reqForm: any = await new Promise((resolve, reject) => {
    const form = new IncomingForm({ keepExtensions: true, multiples: false });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      fs.readFile(files.avatar.path, function (fsErr, data) {
        if (fsErr) return reject(fsErr);
        resolve({ name: fields.name, file: files.avatar, data });
      });
    });
  });

  aws.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: process.env.S3_REGION,
    signatureVersion: 'v4'
  });

  await new aws.S3().upload(
    {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: reqForm.name + '.jpeg',
      Body: reqForm.data,
      ACL: 'public-read'
    },
    function (s3Err, data) {
      if (s3Err) throw s3Err;
      res.status(200).json({ url: data.Location });
    }
  );
}
