const express = require("express");
const {
  createRecord,
  getRecord,
  getAllRecord,
  updateRecord,
  deleteRecord,
} = require("../../controllers/record/record.controller");

const RecordRouter = express.Router();

RecordRouter.post("/record", createRecord);
RecordRouter.get("/record", getAllRecord);
RecordRouter.get("/record/:id", getRecord);
RecordRouter.patch("/record/:id", updateRecord);
RecordRouter.delete("/record/:id", deleteRecord);

module.exports = RecordRouter;
