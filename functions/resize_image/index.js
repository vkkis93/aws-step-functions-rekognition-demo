const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const sharp = require('sharp');

module.exports.handler = async(event, context) => {

    console.log(event);
    try {
        const image = await s3.getObject({Bucket: process.env.bucketName, Key: '/tmp/2015-wallpaper_111525594_269.jpg'}).promise();
        console.log('image', image);
        const resizedImage = await sharp(image.Body).resize(1280, 720).toBuffer();
        console.log('resizedImage', resizedImage);
        const s3Options = {Bucket: process.env.bucketName, Key: '/tmp/2015-wallpaper_111525594_269.jpg_resized', Body: resizedImage};
        await s3.putObject(s3Options).promise();
        return Promise.resolve();
    } catch (e) {
        console.log(e);
        return Promise.reject(e);
    }
};