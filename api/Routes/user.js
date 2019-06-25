const express = require('express');
const router = express.Router();
const {google} = require('googleapis');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { generateToken, sendToken} = require('../utils/token.utils.js');
const auth = require('../config/auth');

auth(passport);
router.use(passport.initialize());

router.get('/', passport.authenticate('google', passport.authenticate('google-token', {session: false}), function(req, res, next) {
  console.log(req.token);
  console.log("heooloajdsnkadkjka");
  if(!req.user){
    return res.send(401, 'User Not Authenticated');
  }
  req.auth = {
    id: req.user.id
  };

  next();
}, generateToken, sendToken));

module.exports = router;