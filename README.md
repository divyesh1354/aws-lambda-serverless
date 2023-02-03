# CRUK Backend Assignment

## AWS CDK v2 Lambda Function Donation API

Technology Used: Node.js, Typescript, AWS Lambda, DynamoDB

Install node modules and AWS CLI 

```bash
npm install
```

For AWS CLI installation use this link [[HERE](https://awscli.amazonaws.com/AWSCLIV2.pkg)]

After Installation, configure your AWS Credentials using below command. This command will set your AWS ACCOUNT ID and REGION.

```bash
aws configure
```

Then create .env file and add this ENV Variables in it.

```bash
DB_REGION
SNS_REGION
DONATION_TABLE
```

## Generating CloudFormation templates with CDK Synth

Next, we are going to generate and print the CloudFormation equivalent of the CDK stack.

In other words, we're going to synthesize a CloudFormation template, based on the stack we've written in ``lib/recruitment-nodejs-test-stack.ts``

To do that we have to use the synth command.

```bash 
cdk synth
```


## Deploying our CloudFormation Stack

At this point our template has been generated and stored in the ``cdk.out`` directory. We're ready to deploy our CloudFormation stack.

Run the deploy command:

```bash 
cdk deploy
```

Now let's run our API.

```bash
URL: https://lo8gmpgp68.execute-api.us-east-1.amazonaws.com/default/RecruitmentNodejsTestStac-donationFunctionE704864B-lQHwJ0VHiRqc
Method: POST
Parameter: 
{
  "name": "Divyesh Gangani",
  "mobile": "9887768776",
  "email": "divyesh@gmail.com",
  "amount": 20
}
```


## Test AWS CDK Lambda function (Unit Test)

I also implemented test cases for this assignments including positive and negative test cases. I have used JEST for unit testing.

To run unit tests, use this command:

```bash
npm run test
```

Thank you and I hope you will like it!
