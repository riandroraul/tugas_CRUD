const googleRoute = require('express').Router();
const passport = require('passport')
const {loginWithGoogle} = require('../controller/google.controller')

googleRoute.use(passport.initialize());
googleRoute.use(passport.session());

googleRoute.get('/', loginWithGoogle)

module.exports = googleRoute