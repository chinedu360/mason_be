const express = require("express");
const {
  createSubtopic,
  getSubtopics,
  updateSubtopic,
  deleteSubtopic,
} = require("../../controllers/subtopics/subtopic");
const { verifyAccessToken } = require("../../helpers/jwt_helper");

const subtopicRouter = express.Router();

subtopicRouter.post("/subtopics", verifyAccessToken, createSubtopic);
subtopicRouter.get("/subtopics/:topic_id", verifyAccessToken, getSubtopics);
subtopicRouter.patch(
  "/subtopics/:subtopic_id",
  verifyAccessToken,
  updateSubtopic
);
subtopicRouter.delete(
  "/subtopics/:subtopic_id",
  verifyAccessToken,
  deleteSubtopic
);

module.exports = subtopicRouter;
