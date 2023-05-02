const asyncHandler = require('../utils/asyncHandler');

const login = asyncHandler(async (req, res, next) => {
  res.status(200).send('Working');
});

const register = asyncHandler(async (req, res, next) => {
  res.status(200).send('Working');
});

module.exports = {
  login,
  register,
};
