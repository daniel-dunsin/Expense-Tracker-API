const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', UserSchema);
