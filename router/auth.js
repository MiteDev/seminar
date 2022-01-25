const express = require('express');
const router = express.Router();
const loginCtrl = require('../controller/loginCtrl');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;



router.get('/login', loginCtrl.loginRoot);
// router.post('/login', loginCtrl.loginAction);
router.get('/logout', loginCtrl.logout);
router.get('/welcome', loginCtrl.Welcome);
router.get('/register', loginCtrl.Register);
router.post('/register', loginCtrl.RegisterAction);
router.post('/login', passport.authenticate('local', loginCtrl.loginAction));

passport.use(new LocalStrategy(loginCtrl.Passport));
passport.serializeUser(loginCtrl.serialize);
passport.deserializeUser(loginCtrl.deserialize);

module.exports = router;