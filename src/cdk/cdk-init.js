#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const core = require('@aws-cdk/core');
const s3 = require('@aws-cdk/aws-s3');
const app = new cdk.App();

class HelloCdkStack extends core.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    new s3.Bucket(this, 'imgdb', {
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
  }
}

new HelloCdkStack(app, 'Eztimate');
