const download = require('image-downloader');
const uuid = require('uuid');

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

module.exports.handler = async (event, context) => {
    console.log(event);
	const uuidName = uuid.v1();
	const options = {
	  url: 'https://www.planwallpaper.com/static/images/2015-wallpaper_111525594_269.jpg',
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
		return context.fail();
	}
};
