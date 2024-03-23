const express = require("express");
const multer = require("multer");
const {
  getAllOfficer,
  updateOfficer,
  deleteOfficerRole,
} = require("../../controllers/officer/officer");
const { fileUpload } = require("../../controllers/upload/upload.controller");
const { verifyAccessToken } = require("../../helpers/jwt_helper");

const officerRouter = express.Router();
const upload = multer({ dest: "uploads/" });

officerRouter.get("/officers", verifyAccessToken, getAllOfficer);
officerRouter.patch("/officers/:id", verifyAccessToken, updateOfficer);
officerRouter.patch(
  "/officers/:id/level",
  verifyAccessToken,
  deleteOfficerRole
);
officerRouter.post(
  "/officers",
  verifyAccessToken,
  upload.single("file"),
  fileUpload
);

module.exports = officerRouter;
