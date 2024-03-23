const express = require("express");
const uploadToS3 = require("../../services/s3Upload");
const {
  createTopic,
  deleteArticleTopic,
  updateArticleTopic,
  getArticle,
} = require("../../controllers/article/article");
const { verifyAccessToken } = require("../../helpers/jwt_helper");

const articleRouter = express.Router();

articleRouter.post(
  "/articles",
  verifyAccessToken,
  uploadToS3("masons-uploads").any(),
  createTopic
);

articleRouter.get("/articles/", getArticle);

articleRouter.patch(
  "/articles/:id",
  verifyAccessToken,
  uploadToS3("masons-uploads").any(),
  updateArticleTopic
);

articleRouter.delete("/articles/:id", verifyAccessToken, deleteArticleTopic);

module.exports = articleRouter;
