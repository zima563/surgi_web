const express = require("express");
const {
  changePassword,
  checkpinCode,
  forgettingPassword,
  login,
  logout,
  protectRoutes,
  register,
  resetPassword,
  userProfile,
  allowedTo,
} = require("./user.controller.js");

const {
  changePasswordValidator,
  checkpinCodeValidator,
  forgettingPasswordValidator,
  loginVal,
  registerVal,
  resetPasswordValidator,
} = require("./user.validation.js");
const { validation } = require("../../middlewares/validation.js");
const { emailExists } = require("../../middlewares/emailExist.js");
const { userConferming } = require("../../middlewares/userConferming.js");

const userRouter = express.Router();

userRouter
  .route("/register")
  .post(validation(registerVal), emailExists, register);
userRouter.route("/login").post(validation(loginVal), login);
userRouter
  .route("/forgettingPassword")
  .post(validation(forgettingPasswordValidator), forgettingPassword);
userRouter
  .route("/checkpinCode")
  .post(validation(checkpinCodeValidator), userConferming, checkpinCode);
userRouter
  .route("/resetPassword")
  .post(validation(resetPasswordValidator), userConferming, resetPassword);
userRouter
  .route("/changePassword")
  .patch(
    protectRoutes,
    allowedTo(), 
    validation(changePasswordValidator),
    changePassword
  );
userRouter.route("/profile").get(protectRoutes, allowedTo("admin" , "user"), userProfile);
userRouter.route("/logOut").patch(protectRoutes, allowedTo("admin" , "user"), logout);

module.exports = userRouter;
