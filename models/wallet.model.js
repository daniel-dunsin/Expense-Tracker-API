const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema(
  {
    currency: {
      type: String,
      enum: ['EUR', 'USD', 'NGN', 'CAD'],
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: [true, 'You have already created a wallet'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Wallet', WalletSchema);
