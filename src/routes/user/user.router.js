const express = require("express");

const {
  registerUser,
  loginUser,
  forgetPassword,
  resetPassword,
  refreshUserToken,
  logoutUser,
  getUsers,
} = require("../../controllers/auth/auth.controller");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
// userRouter.get('/register', registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/forgotPassword", forgetPassword);
userRouter.get("/userDetails", getUsers);
userRouter.patch("/resetPassword/:token", resetPassword);
userRouter.post("/refresh-token", refreshUserToken);
userRouter.delete("/logout", logoutUser);

module.exports = userRouter;
