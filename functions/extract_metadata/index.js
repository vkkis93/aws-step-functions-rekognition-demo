const AWS = require('aws-sdk');
const s3 = new AWS.S3();
module.exports.handler = async(event, context) => {
    const params = {
        Bucket: process.env.bucketName,
        Key: event.key
    };
    try {
        const metadata = await s3.headObject(params).promise();
        return Promise.resolve({metadata});
    } catch (e) {
        console.log(e);
        return Promise.reject(e);
    }
};