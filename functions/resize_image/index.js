const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const sharp = require('sharp');

module.exports.handler = async(event, context) => {

    try {
        const image = await s3.getObject({Bucket: process.env.bucketName, Key: event.key}).promise();
        const resizedImage = await sharp(image.Body).resize(1280, 720).toBuffer();
        const s3Options = {Bucket: process.env.bucketName, Key: `${event.key}_resized`, Body: resizedImage};
        await s3.putObject(s3Options).promise();
        return Promise.resolve({key: event.key});
    } catch (e) {
        console.log(e);
        return Promise.reject(e);
    }
};