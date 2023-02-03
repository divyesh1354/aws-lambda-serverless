import * as cdk from 'aws-cdk-lib';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import * as RecruitmentNodejsTest from '../lib/recruitment-nodejs-test-stack';
import { createDonation } from '../function/createDonation.test';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';

describe('Unit test for Donation API Call Lambda Function', function () {
  describe('Successful Response', function () {
    it('Response with code 200', async () => {
      const stack = new cdk.Stack();
      const table = new Table(stack, "crukDonationTable", {
        partitionKey: {
          name: "id",
          type: AttributeType.STRING
        },
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      });

      const event: APIGatewayProxyEventV2 = {
        body : {
          name: "Divyesh Gangani",
          mobile: "7442184332",
          email:"divyesh@test.com",
          amount:1000
        }
      } as any
      const response = await createDonation(event)

      const data = JSON.parse(response.body);

      expect(response.statusCode).toEqual(200);
      expect(data).toHaveProperty("message");
      expect(response.headers).toMatchObject({  
        "Content-Type": "application/json",
      })
    });
  });

  describe('Unsuccessful Response', function () {
    it('Invalid name field', async () => {
      const stack = new cdk.Stack();
      const table = new Table(stack, "crukDonationTable", {
        partitionKey: {
          name: "id",
          type: AttributeType.STRING
        },
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      });

      const event: APIGatewayProxyEventV2 = {
        body : {
          name: "",
          mobile: "7442184332",
          email:"divyesh@test.com",
          amount:1000
        }
      } as any
      const response = await createDonation(event)
      const data = JSON.parse(response.body);

      expect(response.statusCode).toEqual(403);
      expect(data).toHaveProperty("message");
      expect(data.message).toEqual("Name field is required");
      expect(response.headers).toMatchObject({  
        "Content-Type": "application/json",
      })
    });

    it('Invalid email field', async () => {
      const stack = new cdk.Stack();
      const table = new Table(stack, "crukDonationTable", {
        partitionKey: {
          name: "id",
          type: AttributeType.STRING
        },
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      });

      const event: APIGatewayProxyEventV2 = {
        body : {
          name: "Divyesh Gangani",
          mobile: "7442184332",
          email:"test.com",
          amount:1000
        }
      } as any
      const response = await createDonation(event)
      const data = JSON.parse(response.body);

      expect(response.statusCode).toEqual(403);
      expect(data).toHaveProperty("message");
      expect(data.message).toEqual("Email field is required and must be valid");
      expect(response.headers).toMatchObject({  
        "Content-Type": "application/json",
      })
    });

    it('Invalid mobile field', async () => {
      const stack = new cdk.Stack();
      const table = new Table(stack, "crukDonationTable", {
        partitionKey: {
          name: "id",
          type: AttributeType.STRING
        },
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      });

      const event: APIGatewayProxyEventV2 = {
        body : {
          name: "Divyesh Gangani",
          mobile: "",
          email:"divyesh@test.com",
          amount:1000
        }
      } as any
      const response = await createDonation(event)
      const data = JSON.parse(response.body);

      expect(response.statusCode).toEqual(403);
      expect(data).toHaveProperty("message");
      expect(data.message).toEqual("Mobile number field is required");
      expect(response.headers).toMatchObject({  
        "Content-Type": "application/json",
      })
    });

    it('Invalid amount field', async () => {
      const stack = new cdk.Stack();
      const table = new Table(stack, "crukDonationTable", {
        partitionKey: {
          name: "id",
          type: AttributeType.STRING
        },
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      });

      const event: APIGatewayProxyEventV2 = {
        body : {
          name: "Divyesh Gangani",
          mobile: "7442184332",
          email:"divyesh@test.com",
          amount:0
        }
      } as any
      const response = await createDonation(event)
      const data = JSON.parse(response.body);

      expect(response.statusCode).toEqual(403);
      expect(data).toHaveProperty("message");
      expect(data.message).toEqual("Amount field required ans must be valid number");
      expect(response.headers).toMatchObject({  
        "Content-Type": "application/json",
      })
    });
  });
});
