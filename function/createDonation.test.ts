import { APIGatewayProxyEventV2 } from "aws-lambda";
import { PutItemCommand, PutItemCommandInput, ScanCommand, ScanCommandInput } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb';
import { v4 as uuid } from 'uuid'
import { dynamoClient } from '../config/db'
import { response } from '../helper/response';
import { createDonationValidation } from '../validation/createDonationValidation';

interface DonationInput {
    id?: string
    name: string
    email: string
    mobile: string
    amount: number
}

export async function createDonation(event: APIGatewayProxyEventV2): Promise<any> {
    const { body } = event
    
    if (!body) {
        return response(400, 'please pass valid parameters!')
    }

    const data = JSON.parse(JSON.stringify(body)) as DonationInput
    
    const isValid = createDonationValidation(data);
    if (isValid.status) {
        return response(403, isValid.message)
    }

    const params: PutItemCommandInput = {
        TableName: 'crukDonationTable',
        Item: marshall({
            "id": data.id ?? uuid(),
            "name": data.name,
            "email": data.email,
            "mobile": data.mobile,
            "amount": data.amount
        })
    };

    // check record exists or not
    const checkRecord: ScanCommandInput = {
        TableName: 'crukDonationTable',
        IndexName: 'email',
        FilterExpression: '#email = :email',
        ExpressionAttributeNames: {
            "#email": "email"
        },
        ExpressionAttributeValues: {
            ":email" : {"S": data.email}
        },
        Select: 'COUNT'
    }

    try {
        // Store user donations
        const command = new PutItemCommand(params);
        await dynamoClient.send(command)

        // Check if user donated multiple times
        const newCommand = new ScanCommand(checkRecord)
        const { Count } = await dynamoClient.send(newCommand)
        const checkDonatinCount = (Count) ? Count : 0;

        var message : string = 'Thank you so much for your generous donation!';
        
        if (checkDonatinCount > 1) {
            // var snsParam: PublishInput = {
            //     PhoneNumber: "+447442184332",
            //     Message: "Thank you for the donation!"
            // };
            // const snsRes = await callSNS(snsParam);

            message = `Thank you so much for your generous donation for ${checkDonatinCount} times at Cancer Reserach UK.`;
        }
        return response(200, message)
    } catch (err) {
        console.log(err);
        return response(400, 'something went wrong')
    }
}