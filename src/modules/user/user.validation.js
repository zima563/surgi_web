const joi = require("joi");

const registerVal = joi.object({
  userName: joi.string().min(2).max(30).trim().required(),
  password: joi
    .string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
  rePassword: joi.valid(joi.ref("password")),
  email: joi
    .string()
    .pattern(/[A-Za-z0-9]{3,50}@(gmail|yahoo).com$/)
    .required(),
});

const loginVal = joi.object({
  email: joi.string().pattern(/[A-Za-z0-9]{3,50}@(gmail|yahoo).com$/),
  password: joi
    .string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
});

const forgettingPasswordValidator = joi.object({
  email: joi.string().pattern(/^[A-Za-z0-9]{3,50}@(gmail|yahoo).com$/),
});

const checkpinCodeValidator = joi.object({
  pinCode: joi.string().pattern(/^[0-9][0-9][0-9][0-9][0-9][0-9]$/),
});

const resetPasswordValidator = joi.object({
  newPassword: joi
    .string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
});

const changePasswordValidator = joi.object({
  currentPassword: joi
    .string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required(),
  newPassword: joi
    .string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required(),
  reNewPassword: joi.valid(joi.ref("newPassword")).required(),
});

module.exports = {
  loginVal,
  registerVal,
  changePasswordValidator,
  resetPasswordValidator,
  forgettingPasswordValidator,
  checkpinCodeValidator,
};
