const {
  createWallet,
  getAccountBalance,
  changeWalletCurrency,
} = require('../controllers/wallet.controller');

const router = require('express').Router();

router.post('/create-wallet', createWallet);

// To get account balance
router.get('/balance', getAccountBalance);

// To change wallet currency
router.patch('/change-currency', changeWalletCurrency);
