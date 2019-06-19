const express = require('express');
const router = express.Router();
const {google} = require('googleapis');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../config/development');

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: "https://localhost:8080/google-auth/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));


// const Scope = [
//     'https://www.googleapis.com/auth/plus.me',
//     'https://www.googleapis.com/auth/userinfo.email',
// ];

// const googleConfig = {
//     cliendId: "760894743226-g62tkfeqdg19o05ssstl1629oodsrm7b.apps.googleusercontent.com",
//     clientSecret: "mivbQO5VsXwIB-c47Gm20Nco",
//     redirect: "https://localhost:8080/google-auth"
// };

// function createConnection(){
//     return new google.auth.OAuth2(
//         googleConfig.cliendId,
//         googleConfig.clientSecret,
//         googleConfig.redirect
//     );
// }
// router.post('/', (req, res)=>{
//     const OAuth = createConnection();
//     const url = OAuth.generateAuthUrl({
//         access_type: 'offline',
//         propmt: 'consent',
//         scope: Scope
//     })
//     console.log(url);
//     res.send(url);
// });

// router.post('/signin', async(req, res)=>{
//     const code = req.body.code;    
//     const auth = createConnection();
//     const data = await OAuth.getToken(code);
//     const tokens = data.tokens;
//     auth.setCredentials(tokens);
//     const plus = getGooglePlusApi(auth);
//     const me = await plus.people.get({ userId: 'me' });
//     const userGoogleId = me.data.id;
//     const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
//     return {
//       id: userGoogleId,
//       email: userGoogleEmail,
//       tokens: tokens,
//     };
// });

//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/callback', function(req, res) {
  res.send("hello");
});

router.get('/home', (req, res)=>{
    res.send("hello to home");
});
module.exports = router;