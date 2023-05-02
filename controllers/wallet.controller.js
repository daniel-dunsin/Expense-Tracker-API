const asyncHandler = require('../utils/asyncHandler');

const createWallet = asyncHandler(async (req, res, next) => {
  res.status(200).send('Working');
});

const getAccountBalance = asyncHandler(async (req, res, next) => {
  res.status(200).send('Working');
});

const changeWalletCurrency = asyncHandler(async (req, res, next) => {
  res.status(200).send('Working');
});

module.exports = {
  createWallet,
  getAccountBalance,
  changeWalletCurrency,
};
