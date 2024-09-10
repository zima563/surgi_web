const apiError = require("../utils/apiError.js");

exports.validation = (schema) => {
  return (req, res, next) => {
    
    let filter = { ...req.params, ...req.body, ...req.query };
    if (req.files) {
      filter = { ...filter, images:req.files };
    }

    const { error } = schema.validate(filter, { abortEarly: false });
    if (!error) {
      next();
    } else {
      let errMsg = [];
      error.details.forEach((val) => {
        errMsg.push(val.message);
      });
      next(new apiError(errMsg, 401));
    }
  };
};
