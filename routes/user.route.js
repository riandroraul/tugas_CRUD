const userRoutes = require('express').Router();
const { userRegister, addUser, login, listUsers, loginUser, cekUserLogin, hapusUser } = require('../controller/user.controller');
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
      global.cekUser = await User.find({ email: valueEmail })
      if(valueEmail === ''){
        throw new Error('email dan password harus diisi')
      }
      else if (!cekUser[0]) { // jika tidak ada user 
        throw new Error('email dan password salah')
      }
      return true;
  }),
  body('password').custom( async(valuePassword, {req} ) => {
      if (cekUser[0]) { // jika email dan password tidak cocok
          const matchPass = await comparePassword(valuePassword, cekUser[0].password)
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
userRoutes.delete('/hapusUser', hapusUser);


module.exports = userRoutes