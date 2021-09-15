const awsSDK = require('aws-sdk');
const S3 = require('./s3');
const SES = require('./ses');

const { S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY } = process.env;
const AWS_REGION = process.env.AWS_REGION || 'ap-southeast-2';

awsSDK.config.update({
  accessKeyId: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

const {
  uploadImage: uploadImageToS3,
  fetchImage: fetchImageFromS3,
  uploadDoc: uploadDocToS3,
  fetchDoc: fetchDocFromS3,
  removeImage: removeImageFromS3,
  removeDoc: removeDocFromS3,
} = S3(awsSDK);
const { sendEmail, getDomainIdentities } = SES(awsSDK);

module.exports = { uploadImageToS3, fetchImageFromS3, uploadDocToS3, fetchDocFromS3, removeImageFromS3, sendEmail, getDomainIdentities, removeDocFromS3 };
