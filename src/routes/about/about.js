const express = require("express");

const uploadToS3 = require("../../services/s3Upload");
const { verifyAccessToken } = require("../../helpers/jwt_helper");
const {
  createOrUpdateAboutPost,
  findAboutPost,
} = require("../../controllers/about/about");

const aboutPostRouter = express.Router();

aboutPostRouter.post(
  "/about",
  //   verifyAccessToken,
  uploadToS3("masons-uploads").any(),
  createOrUpdateAboutPost
);
aboutPostRouter.get("/about", findAboutPost);

module.exports = aboutPostRouter;
