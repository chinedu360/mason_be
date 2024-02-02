const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const {
  newsletterValidationSchema,
} = require("../../helpers/validation_schema");
const Newsletter = require("../../models/newsletter/newsletter.model");
const Email = require("./../../utils/email/email");

const newsletter = async (req, res, next) => {
  try {
    const result = await newsletterValidationSchema.validateAsync(req.body);
    const token = uuidv4();
    const url = `${req.protocol}://${req.hostname}/`;
    const unsubscribeUrl = `${req.protocol}://${process.env.UNSUBSCRIBE_URL}/unsubscribe/${token}`;

    // Check if the email already exists
    const existingEmail = await Newsletter.findOne({
      email: result.email,
      subscribeStatus: true,
    });
    if (existingEmail) {
      throw createError.Conflict(
        `${result.name} you already subscribed to our newsletter.`
      );
    }

    // Check if the email already exists and is unsubscribed
    const unsubscribedEmail = await Newsletter.findOne({
      email: result.email,
      subscribeStatus: false,
    });

    if (unsubscribedEmail) {
      const token2 = uuidv4();
      unsubscribedEmail.name = result.name;
      unsubscribedEmail.subscribeStatus = true;
      unsubscribedEmail.token = token2;
      await unsubscribedEmail.save();

      const newNewsletterToken = {
        name: result.name,
        email: result.email,
      };
      const unsubscribeUrl2 = `${req.protocol}://${process.env.UNSUBSCRIBE_URL}/unsubscribe/${token2}`;
      await new Email(
        newNewsletterToken,
        url,
        unsubscribeUrl2
      ).sendNewsletter();
      return res.status(200).json({
        message: `${result.name}, thanks for subscribing to our newsletter again!`,
      });
    }

    // Create a new newsletter instance
    const newNewsletter = new Newsletter({
      name: result.name,
      email: result.email,
      token: token,
      subscribeStatus: true,
    });

    // Save the new newsletter
    await newNewsletter.save();

    const newNewsletterToken = {
      name: result.name,
      email: result.email,
    };
    await new Email(newNewsletterToken, url, unsubscribeUrl).sendNewsletter();

    return res.status(200).json({
      message: `${result.name}, thanks for subscribing to our newsletter!`,
    });
  } catch (error) {
    console.error("Error creating newsletter:", error);
    if (error.isJoi === true) {
      return res.status(501).json({ message: error.message });
    }
    next(error);
  }
};

const unsubscribeNewletter = async (req, res, next) => {
  try {
    const token = req.params.token;

    // Check if the token exists in the URL
    if (!token) {
      return res.status(404).send({ message: "Token does not exist" });
    }

    const subscriberToken = await Newsletter.findOne({ token: token });

    if (!subscriberToken) {
      return res.status(404).json({ message: "Token not found" });
    }

    subscriberToken.subscribeStatus = false;
    await subscriberToken.save();

    return res.status(200).json({
      message:
        "while we hate to see you leave, we say thanks for the time you have spent with us.",
    });
  } catch (error) {
    console.error("Error unsubscribing:", error, req.params.token);
    return res
      .status(500)
      .json({ message: "An error occurred while unsubscribing" });
  }
};

module.exports = {
  newsletter,
  unsubscribeNewletter,
};
