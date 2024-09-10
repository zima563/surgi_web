const Jwt = require("jsonwebtoken");
const userModel = require("../../../DB/models/user.model.js");
const { catchError } = require("../../middlewares/catchError.js");
const  apiError  = require("../../utils/apiError.js");
const bcrypt = require("bcrypt")
// const sendEmailPcode = require("../../services/email/sendEmailPinCode.js");

const register = catchError(async (req, res, next) => {
  let user = await userModel.create(req.body);
  res.status(200).json({ msg: "success", user });
});

const login = catchError(async (req, res, next) => {
  let user = await userModel.findOne({ where: { email: req.body.email } });
  if (user.isBlocked) {
    return next(new apiError("you account is blocked", 403));
  } else if (user && bcrypt.compareSync(req.body.password, user.password)) {
    let token = Jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_KEY
    );

    return res.json({
      msg: "success",
      token,
      role: user.role,
      userName: user.userName,
      userProfile: user.profileImg,
    });
  }
  next(new apiError("email or password incorrect", 401));
});

const forgettingPassword = catchError(async (req, res, next) => {
  let user = await userModel.findOne({ where: { email: req.body.email } });
  if (!user) return next(new apiError("not found email", 404));
  const pinCode = Math.floor(100000 + Math.random() * 900000).toString();
  const pinCodeExpire = new Date();
  pinCodeExpire.setMinutes(pinCodeExpire.getMinutes() + 10);
  user.pinCode = pinCode;
  user.pinCodeExpire = pinCodeExpire;
  user.resetVerified = false;

  await user.save();
  let token = Jwt.sign({ userId: user._id }, process.env.JWT_KEY);
  let subjectOfEmail = "Forgetting Password";
  sendEmailPcode(user.email, user.pinCode, subjectOfEmail);

  res.json({ msg: "send of message successfully", token });
});

const checkpinCode = catchError(async (req, res, next) => {
  let user = await userModel.findByPk(req.user._id);
  if (user.pinCode !== req.body.pinCode || new Date() > user.pinCodeExpire)
    return next(new apiError("Invalid or expired PinCode", 401));
  user.pinCode = null;
  user.resetVerified = true;
  await user.save();
  res.json({ msg: "verification of pinCode is successfully" });
});

const resetPassword = catchError(async (req, res, next) => {
  let user = await userModel.findOne({
    where: {
      _id: req.user._id,
      resetVerified: true,
    },
  });

  user.password = req.body.newPassword;
  await user.save();
  let token = Jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_KEY
  );

  res.status(200).json({ msg: "reset password is success ", token });
});

const userProfile = catchError(async (req, res, next) => {
  let user = req.user;
  res.status(200).json({ msg: "success ", user });
});

const changePassword = catchError(async (req, res, next) => {
  let user = await userModel.findByPk(req.user._id);
  if (user && bcrypt.compareSync(req.body.currentPassword, user.password)) {
    let token = Jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_KEY
    );
    await user.update({
      password: req.body.newPassword,
      passwordChangedAt: Date.now(),
    });
    return res.json({ msg: "your password is changed successfully", token });
  }

  next(new apiError("password incorrect", 401));
});

const logout = catchError(async (req, res, next) => {
  await userModel.update(
    {
      logoutAt: Date.now(),
      isActive: false,
    },
    {
      where: { id: req.user.id },
    }
  );
  res.status(200).json({ msg: "you logOut successfuly" });
});

const protectRoutes = catchError(async (req, res, next) => {
  let { token } = req.headers;

  if (!token) return next(new apiError("not token provide", 401));

  let decoded = Jwt.verify(token, process.env.JWT_KEY);
  let user = await userModel.findByPk(decoded.userId);
  if (!user) return next(new apiError("user not found"));

  if (user.isBlocked) {
    return next(new apiError("you account is blocked", 403));
  }

  if (user.passwordChangedAt) {
    let timeOfChangePassword = parseInt(user?.passwordChangedAt / 1000);
    if (timeOfChangePassword > decoded.iat)
      return next(new apiError("invalid token..please login", 401));
  }

  // console.log(decoded.iat + "|" + parseInt(user?.logoutAt / 1000));
  if (user.logoutAt) {
    let timeOflogout = parseInt(user?.logoutAt / 1000);
    if (timeOflogout > decoded.iat)
      return next(new apiError("invalid token..please login", 401));
  }
  req.user = user;
  next();
});

const allowedTo = (...roles) => {
  return catchError(async (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new apiError("you are not authorized", 401));

    next();
  });
};

module.exports = {
  register,
  login,
  userProfile,
  forgettingPassword,
  resetPassword,
  checkpinCode,
  changePassword,
  logout,
  protectRoutes,
  allowedTo,
};
