const asyncHandler = require('../utils/asyncHandler');
const { CustomError } = require('../utils/errors');
const Transaction = require('../models/transaction.model');
const Wallet = require('../models/wallet.model');
const User = require('../models/user.model');
const sendMail = require('../utils/nodemailer');
const formatDate = require('../utils/formatDate');

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

/**
 * @route - /transaction/year?year=2020
 */
const getYearTransaction = asyncHandler(async (req, res, next) => {
  const date = new Date();
  const year = parseInt(req.query.year) || date.getFullYear();

  const user = await User.findOne({ _id: req.userId });
  const yearTransaction = await Transaction.find({
    owner: req.userId,
  }).populate('owner');

  // filter by year
  const result = yearTransaction?.filter((transaction) => {
    const transactionYear = new Date(transaction.createdAt).getFullYear();

    if (year === transactionYear) {
      return transaction;
    }
  });

  await sendMail(user.email, `Transactions for year ${year}`, result);

  res.status(200).send({
    transactions: result,
  });
});

/**
 * @route - /transaction/year?year=2020&month=09
 */
const getMonthTransaction = asyncHandler(async (req, res, next) => {
  const date = new Date();
  const year = parseInt(req.query.year) || date.getFullYear();
  const month = parseInt(req.query.month) || date.getMonth() + 1;

  const user = await User.findOne({ _id: req.userId });
  const allTransactions = await Transaction.find({
    owner: req.userId,
  }).populate('owner');

  const monthTransaction = allTransactions.filter((transaction) => {
    const transactionDate = new Date(transaction.createdAt);

    if (
      transactionDate.getFullYear() === year &&
      transactionDate.getMonth() + 1 === month
    ) {
      return transaction;
    }
  });

  await sendMail(
    user.email,
    `Transactions for month ${month}`,
    monthTransaction
  );

  res.status(200).send({
    transactions: monthTransaction,
  });
});

module.exports = {
  createTransaction,
  getYearTransaction,
  getMonthTransaction,
};
