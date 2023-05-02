const asyncHandler = require('../utils/asyncHandler');
const { CustomError } = require('../utils/errors');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const register = asyncHandler(async (req, res, next) => {
  const { email, username, password } = req.body;

  if (!email || !password || !username) {
    return next(new CustomError('Provide username, email & password', 400));
  }

  const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

  const user = await User.create({
    email,
    username,
    password: hashedPassword,
  });

  const token = await user.createJWT();

  const { password: passwordInDb, ...rest } = user._doc;

  res
    .status(201)
    .send({ user: rest, token, message: 'Account created Successfully' });
});

const login = asyncHandler(async (req, res, next) => {
  const { detail, password } = req.body;

  if (!detail || !password) {
    return next(
      new CustomError('Provide username & password  or email & password', 400)
    );
  }

  // Check for a user with that username;

  let user = await User.findOne({ username: detail });

  if (!user) {
    // Check for a user with that email
    user = await User.findOne({ email: detail });
  }

  if (!user) {
    return next(new CustomError("User doesn't exist", 404));
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return next(new CustomError('Wrong password', 400));
  }

  const token = await user.createJWT();

  const { password: passwordInDb, ...rest } = user._doc;

  res.status(200).send({
    user: rest,
    token,
    message: 'Login Successful',
  });
});

module.exports = {
  login,
  register,
};
