const {
  getYearTransaction,
  getMonthTransaction,
  createTransaction,
} = require('../controllers/transaction.controller');

const router = require('express').Router();

router.post('/', createTransaction);

router.get('/year', getYearTransaction);

router.get('/month', getMonthTransaction);

module.exports = router;
