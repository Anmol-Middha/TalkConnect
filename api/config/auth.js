const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('./development');
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: "https://talkconnect.herokuapp.com/google-auth/callback"
            // callbackURL: "https://localhost:8080/google-auth/callback"
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};