const express = require('express');
const { userRegister, addUser, login } = require('../controller/user.controller');
const userRoutes = express.Router();
const flash = require('connect-flash')
const session = require('express-session')
const { body, validationResult } = require('express-validator')
const User = require('../model/users')


userRoutes.use(session({
  secret:'flashblog',
  saveUninitialized: true,
  resave: true
}));

userRoutes.use(flash())
userRoutes.get('/register', userRegister)

userRoutes.post('/tambahUser', [ 
    body('email').custom(async (value) => {
    const cekUser = await User.findOne({ email: value })
    if (!cekUser) { // jika ada user 
        throw new Error('email salah')
    }
    return true;
  }),
], addUser )
userRoutes.get('/login', login)

module.exports = userRoutes