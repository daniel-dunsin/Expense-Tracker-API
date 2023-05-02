const {
  createWallet,
  getAccountBalance,
  changeWalletCurrency,
} = require('../controllers/wallet.controller');
const hasWallet = require('../middlewares/hasWallet');

const router = require('express').Router();

router.post('/create-wallet', createWallet);

// To get account balance
router.get('/balance', hasWallet, getAccountBalance);

// To change wallet currency
router.patch('/change-currency', hasWallet, changeWalletCurrency);

module.exports = router;
