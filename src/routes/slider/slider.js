const express = require("express");

const uploadToS3 = require("../../services/s3Upload");
const {
  uploadSliderImage,
  deleteSliderImage,
} = require("../../controllers/slider/slider");
const { verifyAccessToken } = require("../../helpers/jwt_helper");

const sliderRouter = express.Router();

sliderRouter.post(
  "/slider",
  verifyAccessToken,
  uploadToS3("masons-uploads").any(),
  uploadSliderImage
);
sliderRouter.delete("/slider", verifyAccessToken, deleteSliderImage);

module.exports = sliderRouter;
