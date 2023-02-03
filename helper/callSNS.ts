// Import required AWS SDK clients and commands for Node.js
import { PublishInput } from "@aws-sdk/client-sns";
import { snsClient } from "./snsClient.js";

export async function callSNS(params : PublishInput): Promise<any> {

    try {
        // Publish aws SNS
        const data = await snsClient.publish(params);
        console.log(data);
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        }
    } catch (err) {
        console.log(err)
        return {
            statusCode: 400,
            body: JSON.stringify(err),
        }
    }
};
