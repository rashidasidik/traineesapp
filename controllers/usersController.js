const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const { validateAddUser } = require("../validations/userValidations");

const addUser = async (req, res) => {
  //complexity and hashing with bcrypt

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //find user form DB

  const emailFound = await User.findOne({ email: req.body.email });
  if (emailFound) return res.status(403).send("email already exist");

  //validate a user
  const { error } = validateAddUser.validate(req.body);
  if (error) return res.status(402).send(error.details);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  await newUser.save();
  res.status(202).json(newUser);
};

const userLogin = async (req, res) => {
  //user verification
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("account not found");

  //password verification
  const verifiedPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!verifiedPassword)
    return res.status(404).send("Invalid email or password");

  //token assignment

  const token_id = jwt.sign({ _id: user._id }, process.env.SECRET_CODE);

  res.header("authorization", token_id).send(token_id);
};

module.exports = { addUser, userLogin };
