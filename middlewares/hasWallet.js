const asyncHandler = require('../utils/asyncHandler');
const { CustomError } = require('../utils/errors');
const Wallet = require('../models/wallet.model');

// It should always be after the isAuth middleware because it needs to get the user id

module.exports = asyncHandler(async (req, res, next) => {
  const userId = req.userId;

  const wallet = await Wallet.findOne({ owner: userId });

  if (!wallet) {
    return next(new CustomError('You have not created any wallet', 401));
  }

  req.userWallet = wallet;

  next();
});
