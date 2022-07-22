const mongoose = require('mongoose')

// membuat schema

const user = mongoose.model('user', {
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

module.exports = user;
