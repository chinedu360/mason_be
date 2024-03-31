const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const registerAuthSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
  // passwordConfirm: Joi.ref("password"),
  name: Joi.string().min(3).required(),
  officerTitle: Joi.string().min(4),
  level: Joi.string().valid("Officer", "admin").default("Officer"),
  phoneNumber: Joi.string().min(9).max(20),
  workPhone: Joi.string().min(9).max(20),
  address: Joi.string().min(3),
  // profilePicture: Joi.string().default("default.png"),
  resetPasswordToken: Joi.string(),
  resetPasswordExpires: Joi.date(),
  passwordChangedAt: Joi.date(),
});

const loginAuthSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
});

const forgetPasswordSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
});

const resetAuthSchema = Joi.object({
  password: Joi.string().min(8).required(),
  passwordConfirm: Joi.string()
    .valid(Joi.ref("password"))
    .min(8)
    .required()
    .messages({
      "any.only": "Passwords do not match",
    }),
});

const newsletterValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(3).required(),
});

const recordValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  amount: Joi.number().required(),
  date: Joi.date().required(),
  type: Joi.string().required(),
  category: Joi.string().required(),
  comment: Joi.string(),
});

module.exports = {
  registerAuthSchema,
  loginAuthSchema,
  forgetPasswordSchema,
  resetAuthSchema,
  newsletterValidationSchema,
  recordValidationSchema,
};
