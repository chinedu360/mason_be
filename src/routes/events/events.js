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
const { createEvent } = require("../../controllers/events/events");

const eventRouter = express.Router();

eventRouter.post(
  "/event",
  //   verifyAccessToken,
  //   uploadToS3("masons-uploads").any(),
  createEvent
);
eventRouter.patch(
  "/blog/:id",
  verifyAccessToken,
  uploadToS3("masons-uploads").any(),
  updateBlogPost
);
eventRouter.delete("/blog/:id", verifyAccessToken, deleteBlogPost);
eventRouter.get("/blog", findAllBlogPosts);
eventRouter.get(
  "/blog/:author_id",
  verifyAccessToken,
  findByBlogPostByAuthorId
);

module.exports = eventRouter;
