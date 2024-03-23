const express = require("express");

const {
  lodgedetailController,
} = require("../../controllers/lodgeDetails/lodgeDetails.controller");
const uploadToS3 = require("../../services/s3Upload");
const { verifyAccessToken } = require("../../helpers/jwt_helper");

const lodgedetailsRouter = express.Router();

lodgedetailsRouter.post(
  "/lodgedetail",
  verifyAccessToken,
  uploadToS3("masons-uploads").any(),
  lodgedetailController
);

module.exports = lodgedetailsRouter;
