const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    wallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wallet',
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    currency: {
      // get the currency it was issued in initially
      type: String,
      enum: ['EUR', 'USD', 'NGN', 'CAD'],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', TransactionSchema);
