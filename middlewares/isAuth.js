require('dotenv').config();

const asyncHandler = require('../utils/asyncHandler');
const { CustomError } = require('../utils/errors');
const jwt = require('jsonwebtoken');

module.exports = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new CustomError('Provide token', 401));
  }

  const token = authHeader.split(' ')[1];

  const isTokenValid = await jwt.verify(token, process.env.JWT_SECRET);

  if (!isTokenValid) {
    return next(new CustomError('Token is invalid or has expired', 401));
  }

  req.userId = isTokenValid.userId;
  next();
});
