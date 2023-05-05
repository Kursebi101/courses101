const AWS = require('aws-sdk');

const spacesEndpoint = new AWS.Endpoint('https://courses101-space.fra1.digitaloceanspaces.com');
const s3 = new AWS.S3({
  endpoint: 'fra1.digitaloceanspaces.com',
  accessKeyId: process.env.DO_ACCESS_KEY,
  secretAccessKey: process.env.DO_SECRET_KEY,
});

module.exports = s3;
