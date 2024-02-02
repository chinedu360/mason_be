const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../../models/user/user.modal");
const createError = require("http-errors");
const {
  resetAuthSchema,
  loginAuthSchema,
  registerAuthSchema,
  forgetPasswordSchema,
} = require("../../helpers/validation_schema");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../../helpers/jwt_helper");
const redisClient = require("../../helpers/init_redis");
const sendEmail = require("../../utils/email/email");
const Email = require("../../utils/email/email");
const { generatePassword } = require("../../helpers/generateRandomPassword");

const createSendToken = async (id, statusCode, res) => {
  console.log(id.toString());

  const accessToken = await signAccessToken(id.toString());
  const refreshToken = await signRefreshToken(id.toString());

  const cookieOptions = {
    expires: new Date(
      Date.now() + `${process.env.JWT_COOKIE_EXPIRATION}` * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (`${process.env.NODE_ENV}` === "production") cookieOptions.secure = true;
  res.cookie("jwt", accessToken, cookieOptions);

  console.log(accessToken, refreshToken);
  // user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    message: "User Registered Successfully",
    accessToken,
    refreshToken,
    // data: {
    //   user,
    // },
  });
};

async function registerUser(data, req, res, next) {
  try {
    //for generating random password
    const dummyPassword = generatePassword(6);
    const result = await registerAuthSchema.validateAsync(req.body);

    // console.log({ result });
    const password = await bcrypt.hash(dummyPassword, 10);

    console.log({ password }, data.email);

    const user = new User(
      result.name,
      result.level,
      result.officerTitle,
      result.phoneNumber,
      result.workPhone,
      result.email,
      result.address,
      password
    );

    const savedUserId = await user.save();

    console.log({ savedUserId });
    // Handle other operations like sending emails, creating tokens, etc.
    createSendToken(savedUserId, 201, res);
  } catch (error) {
    // if (error.isJoi === true) {
    //   error.status = 422;
    //   res.status(422).json({ error: error.message }, "hiii");
    // } else {
    //   console.log({ error });
    //   res.status(500).json({ error: "Internal Server Error" });
    // }
  }
}

async function loginUser(req, res, next) {
  try {
    const result = await loginAuthSchema.validateAsync(req.body);
    const user = await User.findByEmail(result.email);

    console.log(result.password, user[0][0].password);
    // if (!user) throw createError.NotFound('User not registered');
    if (!user) return next(createError.NotFound("User not registered"));

    const isMatch = await User.isValidPassword(
      result.password,
      user[0][0].password
    );

    console.log({ isMatch });
    if (!isMatch)
      return next(createError.Unauthorized("Username/Password not valid"));

    const accessToken = await signAccessToken(user[0][0].id.toString());
    const refreshToken = await signRefreshToken(user[0][0].id.toString());

    user.password = undefined;
    res.send({
      accessToken,
      refreshToken,
      message: "Login Successful",
      user: user[0][0],
    });
  } catch (error) {
    if (error.isJoi === true)
      return next(createError.BadRequest("Invalid Username/Password"));
    next(error);
  }
}

async function forgetPassword(req, res, next) {
  try {
    // get user based on email
    const result = await forgetPasswordSchema.validateAsync(req.body);
    const user = await User.findByEmail(result.email);
    // check if the user exit
    if (!user) {
      return next(
        createError.NotFound("There is no user with email " + req.body.email)
      );
    }

    //generate random reset token(do this in the user mongoose schema)
    const resetToken = await User.createPasswordResetToken(result.email);

    //send the email notification
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/resetPassword/${resetToken}`;

    console.log({ resetURL });

    // await new Email(user, resetURL).sendResetPassword();

    res.status(200).json({
      status: "success",
      message: "Please check your email, a token was sent!",
    });
  } catch (error) {
    // user.passwordResetToken = undefined;
    // user.passwordResetExpires = undefined;
    // await user.save({ validateBeforeSave: false });
    console.log({ error });

    return next(
      createError.InternalServerError(
        "There was an error sending your email. Try again later!"
      )
    );
  }
}

async function resetPassword(req, res, next) {
  try {
    //get user based on the token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.resetPassword(hashedToken);

    console.log({ user }, hashedToken);

    // if token is not expired and there is a user setthe new password
    if (!user) {
      return next(createError.BadRequest("Token expired"));
    }

    const result = await resetAuthSchema.validateAsync(req.body);
    // console.log({result})
    // user.password = result.password;
    // user.passwordConfirm = result.passwordConfirm;
    // user.passwordResetToken = undefined;
    // user.passwordResetExpires = undefined;
    // await user.save();

    const updateNewPassword = await User.updatePassword(
      result.password,
      user[0][0].id
    );

    // update changePasswordAt property for a user
    // log tthe user in, send JWT
    const accessToken = await signAccessToken(user.id);
    res.status(200).json({
      status: "success",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
    // return next(
    //   createError.InternalServerError("Make sure your passward matches")
    // );
  }
}

async function refreshUserToken(req, res, next) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();
    const userId = await verifyRefreshToken(refreshToken);

    const accessToken = await signAccessToken(userId);
    const refToken = await signRefreshToken(userId);

    res.send({ accessToken, refToken });
  } catch (error) {
    next(error);
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.getAllUsers();
    console.log(users);
    res.status(200).json({ users }); // Send the users as a JSON response
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: "Failed to fetch users" }); // Send an error response if fetching fails
  }
}

async function logoutUser(req, res, next) {
  try {
    const { refreshToken } = req.body;
    // console.log("hjcgxxmnasbx")
    if (!refreshToken) {
      console.log("true");
      throw createError.BadRequest("No Refresh Token");
    }
    const userId = await verifyRefreshToken(refreshToken);
    // console.log("userId", userId);

    await redisClient
      .DEL(userId)
      .then((val) => {
        // console.log("val:", val);
        return res.sendStatus(204);
      })
      .catch((err) => {
        console.log(err.message, "err.message");
        throw createError.InternalServerError();
      });
  } catch (error) {
    // console.log("hierr:", error.message);
    next(error);
  }
}

module.exports = {
  registerUser,
  getUsers,
  loginUser,
  refreshUserToken,
  logoutUser,
  forgetPassword,
  resetPassword,
};

// async function registerUser(req, res, next) {
//   try {
//     //dont not use the req.body directly(const { email, password } = req.body), instead i used joi to validate first then got the req.body from the result of that action.
//     const result = await registerAuthSchema.validateAsync(req.body);
//     // console.log("err:", err)

//     const exitingUser = await User.findOne({ email: result.email });
//     if (exitingUser) {
//       throw createError.Conflict(`${result.email} is already been registered`);
//     }

//     const user = new User(result);
//     const savedUser = await user.save();
//     // const accessToken = await signAccessToken(savedUser.id);
//     // const refreshToken = await signRefreshToken(savedUser.id);

//     const url = `${req.protocol}://${req.hostname}/login`;
//     console.log({ url });
//     await new Email(savedUser, url).sendWelcome();

//     createSendToken(savedUser, 201, res);
//   } catch (error) {
//     if (error.isJoi === true) error.status = 422;
//     next(error);
//   }
// }
