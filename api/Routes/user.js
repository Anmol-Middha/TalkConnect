const express = require('express');
const router = express.Router();
const {google} = require('googleapis');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../config/development');

passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: "https://talkconnect.herokuapp.com/google-auth/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      console.log(profile.emails[0].value);  
      return done(err, user);
    });
  }
));

router.get('/', passport.authenticate('google', 
{ scope: [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email'
]}
));

router.get('/callback', function(req, res) {
  passport.authorize('google', {
    successRedirect : '/dashboard',
    failureRedirect : '/'
  })
});

module.exports = router;