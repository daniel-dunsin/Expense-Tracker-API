const asyncHandler = require('../utils/asyncHandler');
const { CustomError } = require('../utils/errors');
const Transaction = require('../models/transaction.model');
const Wallet = require('../models/wallet.model');

/**
 * @route - /transaction?transactionType=withdraw or /transaction?transactionType=deposit
 */

const acceptedTransactionTypes = ['deposit', 'withdraw'];

const createTransaction = asyncHandler(async (req, res, next) => {
  // get transaction type from request query
  // get amount and description from client request body
  // get wallet and owner id  and currency from the middlewares attachment

  const { transactionType } = req.query;
  const { amount, description } = req.body;
  const { _id, currency } = req.userWallet;
  const userId = req.userId;

  if (!transactionType || !acceptedTransactionTypes.includes(transactionType)) {
    return next(new CustomError('Provide transaction type', 400));
  }

  if (!amount || !description) {
    return next(
      new CustomError('Provide amount and transaction description', 400)
    );
  }

  if (amount > req.userWallet.amount && transactionType === 'withdraw') {
    return next(new CustomError('Insufficient balance', 400));
  }

  const transaction = await Transaction.create({
    description,
    amount,
    transactionType,
    currency,
    wallet: _id,
    owner: userId,
  });

  const wallet = await Wallet.findByIdAndUpdate(
    _id,
    {
      amount:
        transactionType === 'deposit'
          ? req.userWallet.amount + amount
          : req.userWallet.amount - amount,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(201).send({
    message: 'Transaction Was Successful',
    transactionDetails: transaction,
    accountBalance: wallet.amount,
  });
});

const getYearTransaction = asyncHandler(async (req, res, next) => {
  res.status(200).send('Working');
});
const getMonthTransaction = asyncHandler(async (req, res, next) => {
  res.status(200).send('Working');
});

module.exports = {
  createTransaction,
  getYearTransaction,
  getMonthTransaction,
};
