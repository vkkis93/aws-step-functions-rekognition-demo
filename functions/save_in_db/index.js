const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
module.exports.handler = async(event, context) => {
    var params = {
        Item: {
            "Key": {
                S: "11111"
            },
            "AlbumTitle": {
                S: "Somewhat Famous"
            },
            "Artist": {
                S: "No One You Know"
            },
            "SongTitle": {
                S: "Call Me Today"
            }
        },
        TableName: "imageTable"
    };
    try {
        await dynamodb.putItem(params).promise();
    } catch (e) {
        console.log('e', e);
        return Promise.reject(e);
    }
};