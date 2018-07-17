const AWS = require('aws-sdk');
const rekognition = new AWS.Rekognition();

module.exports.handler = async(event, context) => {
    const params = {
        Image: {
            S3Object: {
                Bucket: process.env.bucketName,
                Name: event.key
            }
        }
    };
    try {
        const detectedCelebrities = await rekognition.recognizeCelebrities(params).promise();
        const data = [];
        detectedCelebrities.CelebrityFaces.forEach(item => {
            data.push({
                Name: item.Name,
                Confidence: item.MatchConfidence,
                isCelebrity: true
            });
        });
        if (data.length) return Promise.resolve(data);

        const detectedLabels = await rekognition.detectLabels(params).promise();
        detectedLabels.Labels.forEach(item => {
            data.push({
                Name: item.Name,
                Confidence: item.Confidence,
                isCelebrity: false
            });
        });
        return Promise.resolve(data);
    } catch (e) {
        console.log('e', e);
        return Promise.reject(e);
    }
};