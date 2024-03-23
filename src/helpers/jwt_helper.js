var jwt = require("jsonwebtoken");
const createError = require("http-errors");
const redisClient = require("../helpers/init_redis");

const User = require("../../src/models/user/user.modal");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = `${process.env.ACCESS_TOKEN_SECRET}`;

      const options = {
        expiresIn: `${process.env.JWT_EXPIRATION}`,
        issuer: "masons",
        audience: String(userId), // Ensure userId is converted to a string
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          return reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    console.log(req.headers);
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];

    jwt.verify(
      token,
      `${process.env.ACCESS_TOKEN_SECRET}`,
      async (err, payload) => {
        console.log(payload);
        if (err) {
          const message =
            err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
          return next(createError.Unauthorized(message));
        }

        const freshUser = await User.findById(payload.aud);
        console.log(freshUser);
        req.payload = payload;
        req.user = freshUser;
        // console.log({"req":payload.aud, "hello world": req.user})
        next();
      }
    );
  },
  authrized: (...roles) => {
    return (req, res, next) => {
      // roles ['admin', 'famer']. role='user'
      if (!roles.includes(req.user.role)) {
        return next(
          createError.Forbidden(
            "You do not have permission to perform this action."
          )
        );
      }

      next();
    };
  },
  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = `${process.env.REFRESH_TOKEN_SECRET}`;

      const options = {
        expiresIn: "1y",
        issuer: "cluckcreekmeadow.com",
        audience: userId,
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          return reject(createError.InternalServerError());
        }
        redisClient.SET(
          userId,
          token,
          "EX",
          365 * 24 * 60 * 60,
          (err, reply) => {
            if (err) {
              console.log(err.message);
              return reject(createError.InternalServerError());
            }
          }
        );

        // console.log("redisToken:" ,token);
        resolve(token);
      });
    });
  },
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      jwt.verify(
        refreshToken,
        `${process.env.REFRESH_TOKEN_SECRET}`,
        (err, payload) => {
          if (err) return reject(createError.Unauthorized());
          const userId = payload.aud;
          resolve(userId);
          redisClient.GET(userId, (err, result) => {
            if (err) {
              console.log(err.message);
              return reject(createError.InternalServerError());
            }
            if (refreshToken === result) return resolve(userId);
            reject(createError.Unauthorized());
          });
        }
      );
    });
  },
};
