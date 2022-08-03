const userRoutes = require('express').Router();
const { userRegister, addUser, login, listUsers, loginUser, cekUserLogin } = require('../controller/user.controller');
const flash = require('connect-flash')
const { body, validationResult } = require('express-validator')
const User = require('../model/users');
const {comparePassword} = require('../validasi/hashingPassword');


userRoutes.use(flash())

userRoutes.get('/register', userRegister)

userRoutes.post('/tambahUser', [
    body('email').custom(async (value, {req}) => {
    const cekUser = await User.findOne({ email: value })
    if (cekUser) { // jika ada user 
      throw new Error('email sudah digunakan')
    }
      return true
  }),
], addUser )

userRoutes.post('/loginUser', [
  body('email').custom(async (valueEmail, {req}) => {
      // const cekUser = await User.findOne({ email: valueEmail })
      global.cekUser = await User.findOne({ email: valueEmail })
      if(valueEmail === ''){
        throw new Error('email dan password harus diisi')
      }
      else if (!cekUser) { // jika tidak ada user 
        throw new Error('email dan password salah')
      }
      return true;
  }),
  body('password').custom( async(valuePassword, {req}) => {
      if (cekUser) { // jika email dan password tidak cocok
          const matchPass = await comparePassword(valuePassword, cekUser.password)
          if(!matchPass){
            throw new Error('email dan password Salah!')
          }
      }
      return true
  }),
], cekUserLogin)
userRoutes.get('/login', login)
userRoutes.get('/users', listUsers)
userRoutes.get('/loginUser', loginUser)


module.exports = userRoutes