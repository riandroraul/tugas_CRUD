const express = require('express');
const { userRegister, addUser } = require('../controller/user.controller');
const userRoutes = express.Router();
const flash = require('connect-flash')


userRoutes.use(flash())
userRoutes.get('/register', userRegister)

userRoutes.post('/tambahUser', addUser)

module.exports = userRoutes