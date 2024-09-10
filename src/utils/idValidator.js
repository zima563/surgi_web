const Joi = require("joi");

const paramsIdVal = Joi.object({
  id: Joi.string().length(24).hex().required(),
});

module.exports = paramsIdVal