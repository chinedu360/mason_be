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
const { generatePassword } = require("../../helpers/generateRandomPassword");
const { sendEmail } = require("../../utils/email/email");

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

async function registerUser(data, req, res, next, single) {
  try {
    console.log({ data, single });
    //for generating random password
    const dummyPassword = generatePassword(6);
    let result;
    if (!req.body || Object.keys(req.body).length === 0) {
      // Use the provided data directly
      result = data;
    } else {
      // Validate req.body with registerAuthSchema
      result = data;
    }

    const password = await bcrypt.hash(dummyPassword, 10);

    // Map fields accordingly based on the source of data
    const user = new User(
      result.name || result.Name || null,
      result.level || result.LEVEL || null,
      result.officerTitle || result["Officer Title"] || null,
      result.phoneNumber || result["HOME PHONE"] || null,
      result.workPhone || result["WORK PHONE"] || null,
      result.email || result.EMAIL || null,
      result.address || result.ADREESS || null,
      password || null,
      result.passwordResetToken || null,
      result.passwordResetExpires || null,
      result.profilePicture || "Default.png"
    );

    console.log("Data is here:", user);

    const savedUserId = await user.save();

    // send emails here
    await sendEmail({
      from: "staff@freethinkerinstitute.org",
      to: user.email,
      subject: "Welcome to Our Application!",
      html: `Hello ${user.name},<br/><br/>
           Thank you for registering with us!<br/>
           Your temporary password is: ${dummyPassword}<br/><br/>
           Please login to your account and change your password.<br/><br/>
           Visit the URL to change your password: ${process.env.FRONTEND_URL}/forgetpassword <br/><br/>
           Best regards,<br/>
           Your Application Team`,
    });

    console.log({ savedUserId });

    if (single === true) {
      return savedUserId;
    } else {
      return res.status(201).json({
        message: "File uploaded and processed successfully.",
        details: {
          convertedToJson: true,
          registeredUsers: {
            count: savedUserId.length,
            emailsSent: true,
          },
        },
      });
    }
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
      res.status(422).json({ error: error.message });
    } else {
      console.log({ error });
      res.status(500).json({
        error: "Internal Server Error",
        msg: error.message,
      });
    }
  }
}

async function loginUser(req, res, next) {
  try {
    // console.log(req.body);
    const result = await loginAuthSchema.validateAsync(req.body);
    const user = await User.findByEmail(result.email);

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

    // Filter the fields to include only the specified ones
    const filteredResponse = user[0].map((member) => ({
      id: member.id,
      name: member.name,
      level: member.level,
      officerTitle: member.officerTitle,
      phoneNumber: member.phoneNumber,
      workPhone: member.workPhone,
      email: member.email,
      address: member.address,
      profilePicture: member.profilePicture,
      isAdmin: member.isAdmin,
      isBrother: member.isBrother,
      lodgeid: member.lodgeid,
    }));

    res.send({
      accessToken,
      refreshToken,
      message: "Login Successful",
      user: filteredResponse,
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
    console.log(user[0]);
    // check if the user exit
    if (user[0].length < 1)
      return next(
        createError.NotFound("There is no user with email " + req.body.email)
      );

    //generate random reset token(do this in the user mongoose schema)
    const resetToken = await User.createPasswordResetToken(result.email);

    //send the email notification
    const resetURL = `${process.env.FRONTEND_URL}/newpassword/${resetToken}`;

    const emailTemplate = `
      <html>
      <body>
        <p>Hello ${user[0][0].name},</p>
        <p>We received a request to reset your password. If you didn't make this request, you can ignore this email.</p>
        <p>To reset your password, click the following link:</p>
        <a href="${resetURL}">${resetURL}</a>
        <p>Please note that this link is valid for 20 minutes only.</p>
        <p>If you have any questions, please contact our support team.</p>
        <p>Best regards,<br/>Your Application Team</p>
      </body>
      </html>
    `;

    // console.log({ resetURL }, user[0][0].name, user[0][0].email);

    // Send the password reset email
    await sendEmail({
      from: "staff@freethinkerinstitute.org",
      to: user[0][0].email,
      subject: "Password Reset Request",
      html: emailTemplate,
    });

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

    const token = req.params.token;

    console.log(req.params.token, hashedToken);

    const user = await User.resetPassword(token);

    // if token is not expired and there is a user setthe new password
    if (!user) {
      return next(createError.BadRequest("Token expired"));
    }

    const result = await resetAuthSchema.validateAsync(req.body);
    // Hash the new password
    const hashedPassword = await bcrypt.hash(result.password, 10);
    console.log({ result }, user, hashedPassword);
    // user.password = result.password;
    // user.passwordConfirm = result.passwordConfirm;
    // user.passwordResetToken = undefined;
    // user.passwordResetExpires = undefined;
    // await user.save();

    const updateNewPassword = await User.updatePassword(hashedPassword, user);
    console.log({ result }, user, updateNewPassword);
    // update changePasswordAt property for a user
    // log tthe user in, send JWT
    const accessToken = await signAccessToken(user);
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
