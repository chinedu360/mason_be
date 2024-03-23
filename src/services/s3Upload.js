const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const uploadToS3 = (bucketName) => {
  return multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        console.log("File metadata:", file); // Add debug log here
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        console.log("Generating key for file:", file); // Add debug log here
        cb(null, `image-${Date.now()}.png`);
      },
    }),
  });
};

module.exports = uploadToS3;
