const express = require("express");

const {
  lodgedetailController,
} = require("../../controllers/lodgeDetails/lodgeDetails.controller");

const lodgedetailsRouter = express.Router();

lodgedetailsRouter.post("/lodgedetail", lodgedetailController);

module.exports = lodgedetailsRouter;
