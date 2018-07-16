const AWS = require('aws-sdk');
const rekognition = new AWS.Rekognition();

module.exports.handler = async(event, context) => {
    console.log(event);
    const params = {
        Image: {
            S3Object: {
                Bucket: process.env.bucketName,
                Name: 'jobs.jpg'
            }
        }
    };
    try {
        const faces = await rekognition.recognizeCelebrities(params).promise();
        console.log(faces);
        // if (!faces || !faces.CelebrityFaces.length)
        const labels = await rekognition.detectLabels(params).promise()
        console.log(labels);
    } catch (e) {
        console.log('e', e);
    }
    return context.succeed();
};