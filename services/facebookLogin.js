const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');

require('../models/User');

const keys = require('./../keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});
passport.use(
    new FacebookStrategy(
        {
            clientID: keys.facebookID,
            clientSecret: keys.facebookSECRET,
            callbackURL: '/auth/facebook/callback',
            enableProof: true
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log('HERE', accessToken, refreshToken, profile, done);
            const exsistingUser = await User.findOne({
                facebookId: profile.id
            });

            if (exsistingUser) {
                return done(null, exsistingUser);
            }
            const user = await new User({
                facebookId: profile.id,
                name: profile.displayName
            }).save();
            done(null, user);
        }
    )
);
