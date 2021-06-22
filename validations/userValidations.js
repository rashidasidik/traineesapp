const joi = require("joi");
//validation for registration

const validateAddUser = new joi.object({
  name: joi.string().min(4).required().max(150),
  email: joi.string().min(10).max(200).email().required(),
  password: joi.string().min(8).max(40).required(),
});
module.exports = { validateAddUser };
