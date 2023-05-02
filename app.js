require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const xss = require('xss-clean');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./utils/errors');

const authRoutes = require('./routes/auth.route');
const walletRoutes = require('./routes/wallet.route');
const transactionRoutes = require('./routes/transaction.route');
const isAuth = require('./middlewares/isAuth');
const hasWallet = require('./middlewares/hasWallet');

// initialize app
const app = express();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(xss());
app.use(helmet());
app.disable('x-powered-by');

// routes
app.use('/auth', authRoutes);
app.use('/transaction', isAuth, hasWallet, transactionRoutes);
app.use('/wallet', isAuth, walletRoutes);

// errors
app.all('*', notFound);
app.use(errorHandler);

// connect

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit();
  });
