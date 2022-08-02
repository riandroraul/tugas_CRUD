const userRoutes = require('express').Router();
const { userRegister, addUser, login, listUsers, loginUser, cekUSerLogin } = require('../controller/user.controller');
const flash = require('connect-flash')
const { body, validationResult } = require('express-validator')
const User = require('../model/users');
const {comparePassword, hashPassword} = require('../validasi/hashingPassword');
const res = require('express/lib/response');


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
  body('email').custom(async (valueEmail) => { 
      const cekUser = await User.findOne({ email: valueEmail })
      if(valueEmail === ''){
          throw new Error('email dan password harus diisi')
      }
      else if (!cekUser) { // jika ada user 
          throw new Error('email dan password salah')
      }
      return true;
  }),
  body('password').custom( async(valuePassword, {req}) => {
      const hashingPassword = hashPassword(valuePassword)
      const user = await User.findOne({email: req.body.email})
      if (user) { // jika email dan password tidak cocok
          const matchPass = await comparePassword(valuePassword, user.password)
          if(!matchPass){
            throw new Error('email dan password Salah!')
          }
      }
      return true;
  }),
], cekUSerLogin)
userRoutes.get('/login', login)
userRoutes.get('/users', listUsers)
userRoutes.get('/loginUser', loginUser)


module.exports = userRoutes