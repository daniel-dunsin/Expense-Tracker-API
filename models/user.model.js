require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Provide an email'],
    unique: [true, 'User with this email exists'],
  },
  username: {
    type: String,
    required: [true, 'Provide a username'],
    unique: [true, 'User with this username exists'],
  },
  password: {
    type: String,
    required: [true, 'Provide password'],
  },
});

UserSchema.methods.createJWT = async function () {
  const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  return token;
};

module.exports = mongoose.model('User', UserSchema);
