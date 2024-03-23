const express = require("express");
const {
  createMember,
  getMemebers,
  updateMember,
  deleteMember,
  searchMembers,
} = require("../../controllers/member/member");
const uploadToS3 = require("../../services/s3Upload");
const { verifyAccessToken } = require("../../helpers/jwt_helper");

const memberRouter = express.Router();

memberRouter.post(
  "/members",
  verifyAccessToken,
  uploadToS3("masons-uploads").any(),
  createMember
);
memberRouter.get("/members", verifyAccessToken, getMemebers);
memberRouter.patch("/members/:id", verifyAccessToken, updateMember);
memberRouter.delete("/members/:id", verifyAccessToken, deleteMember);
memberRouter.get("/members/search", verifyAccessToken, searchMembers);

module.exports = memberRouter;
