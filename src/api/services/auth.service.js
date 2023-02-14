const passport = require('passport');
const { UserModel } = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userService = require('./user.service');

const passportService = () => {
    // login
    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (email, password, done) => {
        if (!email || !password) {
            return done(null, false, { message: 'Bad Request' });
        }

        const findUser = await UserModel.findOne({ email });

        if (!findUser) return done(null, false);

        const isMatch = await bcrypt.compare(password, findUser.password)
        if (!isMatch) return done(null, false);

        done(null, findUser)
    }))

    passport.use('register', new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    }, async (req, email, _password, done) => {
        try {
            const findUser = await UserModel.findOne({ email });

            if (findUser) return done(null, false, { message: 'User already exist' })

            const user = await userService.save(req.body)
            done(null, user)
        } catch (err) {
            done(err)
        }
    }))

    // serialize and deserialize
    passport.serializeUser((user, done) => {
        done(null, user.email)
    })

    passport.deserializeUser(async (email, done) => {
        const userData = await UserModel.findOne({ email })
        done(null, userData)
    })
}

module.exports = passportService