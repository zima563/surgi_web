const Jwt = require("jsonwebtoken");
const  apiError  = require("../utils/apiError.js");
const  userModel = require("../../DB/models/user.model.js");



exports.userConferming = async (req,res,next)=>{
  let { token } = req.headers;

  if (!token) return next(new apiError("not token provide", 401));

  let decoded = Jwt.verify(token, process.env.JWT_KEY);
  let user = await userModel.findById(decoded.userId);
  if (!user) return next(new apiError("user not found",404));

  req.user = user;
  next();
}