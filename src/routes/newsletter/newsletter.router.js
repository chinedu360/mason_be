const express = require("express");

const {
  newsletter,
  unsubscribeNewletter,
} = require("../../controllers/newsletter/Newsletter.controller");

const NewsletterRouter = express.Router();

NewsletterRouter.get("/unsubscribe/:token", unsubscribeNewletter);
NewsletterRouter.post("/subscribe", newsletter);

module.exports = NewsletterRouter;
