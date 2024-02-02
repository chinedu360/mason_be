const crypto = require("crypto");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
var validator = require("validator");

const NewsletterSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    trim: true,
    lowercase: true,
    // validator: [validator.isEmail, 'Pls Provide valid email']
  },
  token: {
    type: String,
    required: true,
  },
  subscribeStatus: {
    type: Boolean,
    required: true,
  },
});

const Newsletter = mongoose.model("Newsletter", NewsletterSchema);
module.exports = Newsletter;
