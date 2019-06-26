const express = require('express');
const router = express.Router();
const {google} = require('googleapis');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { generateToken, sendToken} = require('../utils/token.utils.js');
const auth = require('../config/auth');

auth(passport);
router.use(passport.initialize());

router.post('/', function(req, res, next) {
  console.log("heooloajdsnkadkjka");
  console.log(req.body);
  console.log(req.body.token)
  if(!req.body.token){
    return res.send(401, 'User Not Authenticated');
  }
  req.auth = {
    id: req.body.token
  };

  next();
}, generateToken, sendToken);

module.exports = router;