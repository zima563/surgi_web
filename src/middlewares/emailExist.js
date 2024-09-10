const  userModel  = require("../../DB/models/user.model.js");
const  apiError = require("../utils/apiError.js");

exports.emailExists = async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (user) return next(new apiError("email already exist", 409));

  next();
};
