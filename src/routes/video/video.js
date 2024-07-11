const express = require("express");

const {
  createBlogPost,
  findByBlogPostByAuthorId,
  findAllBlogPosts,
  deleteBlogPost,
  updateBlogPost,
} = require("../../controllers/blog/blog");
const uploadToS3 = require("../../services/s3Upload");
const { verifyAccessToken } = require("../../helpers/jwt_helper");
const {
  createVideo,
  deleteVideo,
  findAllVideo,
  updateVideo,
} = require("../../controllers/video/video");

const videoRouter = express.Router();

videoRouter.post(
  "/video",
  //   verifyAccessToken,
  //   uploadToS3("masons-uploads").any(),
  createVideo
);
videoRouter.patch(
  "/video/:id",
  //   verifyAccessToken,
  //   uploadToS3("masons-uploads").any(),
  updateVideo
);
videoRouter.delete(
  "/video/:id",
  // verifyAccessToken,
  deleteVideo
);
videoRouter.get("/video", findAllVideo);
videoRouter.get(
  "/blog/:author_id",
  verifyAccessToken,
  findByBlogPostByAuthorId
);

module.exports = videoRouter;
