const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamodb = new AWS.DynamoDB();
module.exports.handler = async(event, context) => {
    const key = event[1].key;
    const rekognition = event[2];
    const params = {
        RequestItems: {
            'imageTable': []
        }
    };
    rekognition.forEach(item => {
        params.RequestItems['imageTable'].push({
            PutRequest: {
                Item: {
                    "Id": {
                        S: uuid.v1()
                    },
                    "File": {
                        S: key
                    },
                    "IsCelebrity": {
                        BOOL: item.isCelebrity
                    },
                    "Name": {
                        S: item.Name
                    },
                    "Confidence": {
                        N: String(item.Confidence)
                    }
                }
            }
        })
    });
    console.log('params', params.RequestItems.imageTable[0].PutRequest);
    try {
        await dynamodb.batchWriteItem(params).promise();
        return Promise.resolve(rekognition)
    } catch (e) {
        console.log('e', e);
        return Promise.reject(e);
    }
};