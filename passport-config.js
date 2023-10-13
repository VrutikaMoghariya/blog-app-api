const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { generateFromEmail } = require("unique-username-generator");
const USER = require('./model/users');
const jwt = require('jsonwebtoken');

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: "807127153-s6rc8ll8tvisiec06tam56n89dvdap1a.apps.googleusercontent.com",
        clientSecret: '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',
        callbackURL: 'http://localhost:3001/user/auth/google/callback',
    }, async (accessToken, refreshToken, profile, done) => {

        try {

            let user = await USER.findOne({ email: profile.emails[0].value });
            if (!user) {
                user = new USER({
                    googleId: profile.id,
                    username: generateFromEmail(
                        profile._json.email,
                        3
                    ),
                    name: profile._json.name,
                    email: profile.emails[0].value,
                    emailVerification: "verified",
                    accountStatus: "active",
                    provider: "google"
                });
                await user.save();
            }

            const token = jwt.sign({ userId: user._id }, "RANDOM-TOKEN");
            return done(null, user, token);

        } catch (err) {
            return done(err, null);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (_id, done) => {
        try {
            const user = await USER.findById(_id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
}


