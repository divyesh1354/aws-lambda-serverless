// Create the DynamoDB service client module using ES6 syntax.
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const DB_REGION = process.env.DB_REGION;

// Create an Amazon DynamoDB service client object.
export const dynamoClient = new DynamoDBClient({
  region: DB_REGION
});
