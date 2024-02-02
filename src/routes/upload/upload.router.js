const express = require("express");

const { fileUpload } = require("../../controllers/upload/upload.controller");

const uploadRouter = express.Router();

uploadRouter.post("/uploadxls", fileUpload);

module.exports = uploadRouter;
