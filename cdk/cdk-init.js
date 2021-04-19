#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const core = require('@aws-cdk/core');
const s3 = require('@aws-cdk/aws-s3');
const app = new cdk.App();

class EztimateBucketStack extends core.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const Bucket = new s3.Bucket(this, 'imagedb', {
      versioned: true,
      removalPolicy: core.RemovalPolicy.DESTROY,
      accessControl: 'Private',
      publicReadAccess: false,
      cors: [
        {
          allowedHeaders: ['*'],
          allowedMethods: ['POST'],
          allowedOrigins: ['*']
        }
      ]
    });

    Bucket();
  }
}

const Stack = new EztimateBucketStack(app, 'Eztimate');
Stack();
