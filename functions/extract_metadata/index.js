const AWS = require('aws-sdk');
const s3 = new AWS.S3();
module.exports.handler = async(event, context) => {
    console.log(event);
    const params = {
        Bucket: process.env.bucketName,
        Key: "HappyFace.jpg"
    };
    try {
        const result = s3.headObject(params).promise();
        console.log(result);
    } catch (e) {
        console.log(e);
    }
    return context.succeed();
};