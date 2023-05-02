const asyncHandler = require('../utils/asyncHandler');

const createTransaction = asyncHandler(async (req, res, next) => {
  res.status(200).send('Working');
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
