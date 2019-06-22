const express = require('express');
const router = express.Router();
const {google} = require('googleapis');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const auth = require('../config/auth');

auth(passport);
router.use(passport.initialize());

router.get('/', passport.authenticate('google', 
{ scope: [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  // 'https://www.googleapis.com/auth/gmail.compose',
]}
));

router.get('/callback' ,passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req, res) => {
    console.log(req.user.token);
    console.log(req.user.profile);
    res.send("hello");
});

module.exports = router;