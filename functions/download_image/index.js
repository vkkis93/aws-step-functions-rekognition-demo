const download = require('image-downloader');
const uuid = require('uuid');

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports.handler = async (event, context) => {
    console.log(event);
	const uuidName = uuid.v1();
	const options = {
	  url: event.url,
	  dest: '/tmp/${uuid}.jpg'
	};
	try {
		const {image, filename} = await download.image(options);

		const s3Options = {Bucket: process.env.bucketName, Key: uuidName, Body: image};
		console.log('s3Options', s3Options);
		await s3.putObject(s3Options).promise();
		return {key: uuidName};
	} catch(e) {
		console.log('e', e);
		return Promise.reject(e);
	}
};
