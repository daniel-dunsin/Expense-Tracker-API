const asyncHandler = require('../utils/asyncHandler');
const Wallet = require('../models/wallet.model');
const { CustomError } = require('../utils/errors');
const { convertCurrency } = require('../utils/currency');

const acceptedCurrencies = ['EUR', 'USD', 'CAD', 'NGN'];

const createWallet = asyncHandler(async (req, res, next) => {
  const { currency } = req.body;

  const userId = req.userId;

  if (!acceptedCurrencies.includes(currency)) {
    return next(new CustomError('Currency not yet available', 406));
  }

  const walletInDB = await Wallet.findOne({ owner: userId });

  if (walletInDB) {
    return next(new CustomError('Wallet already exists', 400));
  }

  const newWallet = await Wallet.create({ currency, owner: userId });

  res.status(201).send({ wallet: newWallet });
});

const getAccountBalance = asyncHandler(async (req, res, next) => {
  res.status(200).send({
    balance: req.userWallet.amount,
    currency: req.userWallet.currency,
  });
});

const changeWalletCurrency = asyncHandler(async (req, res, next) => {
  const { currency } = req.body;

  if (!acceptedCurrencies.includes(currency)) {
    return next(new CustomError('Currency not yet available', 406));
  }

  if (currency === req.userWallet.currency) {
    return next(
      new CustomError('Currency cannot be the same as previous', 400)
    );
  }

  // Convert the amount based on the currency rates
  const newBalance = convertCurrency(
    req.userWallet.currency,
    currency,
    req.userWallet.amount
  );

  const wallet = await Wallet.findByIdAndUpdate(
    req.userWallet._id,
    {
      currency,
      amount: newBalance,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).send({
    message: 'Wallet Currency Updated Successfully',
    currency: wallet.currency,
    balance: wallet.amount,
  });
});

module.exports = {
  createWallet,
  getAccountBalance,
  changeWalletCurrency,
};
