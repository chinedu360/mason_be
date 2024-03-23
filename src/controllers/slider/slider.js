const SliderImg = require("../../models/slider/slider");
const aws = require("aws-sdk");

async function uploadSliderImage(req, res, next) {
  try {
    console.log(req.files);

    // Check if files are present in the request
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Error parsing form data" });
    }

    // Check if required fields are present in the request
    if (!req.files[0].location || !req.files[0].key) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const url = req.files[0].location;
    const img_key = req.files[0].key;

    const sliderImgURI = new SliderImg(url, img_key);

    await sliderImgURI.save();

    res
      .status(200)
      .json({ message: "Slider IMG saved successfully", sliderImgURI });
  } catch (error) {
    console.error("Error uploading slider image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteSliderImage(req, res, next) {
  try {
    const { id, img_key } = req.body;

    console.log(img_key, id);

    const s3 = new aws.S3({
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      region: process.env.S3_BUCKET_REGION,
    });

    const params = {
      Bucket: "imasons-uploads",
      Key: img_key,
    };

    // Delete object from S3
    await s3.deleteObject(params).promise();

    // Delete corresponding entry from database
    const resp = await SliderImg.deleteSliderImgById(id);

    return res.status(200).json({ message: resp });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  uploadSliderImage,
  deleteSliderImage,
};
