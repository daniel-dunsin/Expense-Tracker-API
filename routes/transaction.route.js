const {
  createTransaction,
  getYearTransaction,
  getMonthTransaction,
} = require('../controllers/transaction.controller');

const router = require('express').Router();

// Add new transactions
router.post('/', createTransaction);

router.get('/year', getYearTransaction);

router.get('/month', getMonthTransaction);
