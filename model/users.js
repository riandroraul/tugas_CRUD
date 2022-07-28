const mongoose = require('mongoose')

// membuat schema

const User = mongoose.model('User', {
  nama: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true
  },
  password: {
      type: String,
      required: true
  },
  role: {
      type: Number,
      required: true
  }
});

module.exports = User;
