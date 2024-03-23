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

const blogPostRouter = express.Router();

blogPostRouter.post(
  "/blog",
  verifyAccessToken,
  uploadToS3("imasons-uploads").any(),
  createBlogPost
);
blogPostRouter.patch(
  "/blog/:id",
  verifyAccessToken,
  uploadToS3("imasons-uploads").any(),
  updateBlogPost
);
blogPostRouter.delete("/blog/:id", verifyAccessToken, deleteBlogPost);
blogPostRouter.get("/blog", findAllBlogPosts);
blogPostRouter.get(
  "/blog/:author_id",
  verifyAccessToken,
  findByBlogPostByAuthorId
);

module.exports = blogPostRouter;
