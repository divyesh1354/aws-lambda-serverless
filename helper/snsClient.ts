import  { SNS } from "@aws-sdk/client-sns";

// Set the AWS Region.
const REGION = process.env.SNS_REGION;

// Create SNS service object.
const snsClient = new SNS({ 'region':REGION });
export { snsClient };
