import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { AttributeType, BillingMode, Table, ProjectionType } from 'aws-cdk-lib/aws-dynamodb';
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class RecruitmentNodejsTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // Dynamodb table definition
    const table = new Table(this, "crukDonationTable", {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    process.env.DONATION_TABLE = table.tableName

    // add global secondary index
    table.addGlobalSecondaryIndex({
      indexName: 'email',
      partitionKey: {name: 'id', type: AttributeType.STRING},
      sortKey: {name: 'email', type: AttributeType.STRING},
      projectionType: ProjectionType.ALL,
    });

    // store donation function
    const donationFunction = new NodejsFunction(this, 'donationFunction', {
      runtime: Runtime.NODEJS_16_X,
      entry: `${__dirname}/../function/createDonation.ts`,
      handler: 'createDonation',
      environment: {
        DONATION_TABLE: table.tableName
      }
    })
    
    table.grantReadWriteData(donationFunction)

    new cdk.CfnOutput(this, 'FunctionUrl', {
      value: table.tableName,
    });
  }
}
