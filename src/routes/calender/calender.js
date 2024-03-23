const express = require("express");
const {
  createCalender,
  getCalenderLinks,
  updateCalenderLinks,
} = require("../../controllers/calender/calender");
const { verifyAccessToken } = require("../../helpers/jwt_helper");

const calenderRouter = express.Router();

calenderRouter.post("/calenders", verifyAccessToken, createCalender);
calenderRouter.get("/calenders", getCalenderLinks);
calenderRouter.patch("/calenders", verifyAccessToken, updateCalenderLinks);

module.exports = calenderRouter;
