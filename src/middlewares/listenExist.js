const ListenModel = require("../../DB/models/listen.model.js");
const apiError = require("../utils/apiError.js");

exports.referenceExists = async (req, res, next) => {
  let listen = await ListenModel.findOne({ where: { Reference: req.body.Reference } });
  if (listen) return next(new apiError("reference must be unique", 409));
  next();
};
