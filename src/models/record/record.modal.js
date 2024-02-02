const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  title: {
    type: "string",
    required: true,
    trim: true,
  },
  description: {
    type: "string",
    required: true,
    trim: true,
  },
  amount: {
    type: "number",
    trim: true,
  },
  date: {
    type: "date",
    required: true,
  },
  type: {
    type: "string",
  },
  category: {
    type: "string",
    required: true,
  },
  comment: {
    type: "string",
  },
});

const Record = mongoose.model("Record", RecordSchema);
module.exports = Record;
