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
        if (!email.includes('@') || !email.includes('.')) return done({ message: 'Invalid email, please enter a valid one', status: 400 }, false);
        if (password.length < 8) return done({ message: 'Invalid password, must be at least 8 characters', status: 400 }, false);
        
        const findUser = await UserModel.findOne({ email });

        if (!findUser) return done({ message: 'Invalid credentials', status: 400 }, false);

        const isMatch = await bcrypt.compare(password, findUser.password)
        if (!isMatch) return done({ message: 'Invalid credentials', status: 400  }, false);

        done(null, findUser)
    }))

    passport.use('register', new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            console.log(email, password);
            if (!email.includes('@') || !email.includes('.')) return done({ message: 'Invalid email, please enter a valid one', status: 400 }, false);
            if (password.length < 8) return done({ message: 'Invalid password, must be at least 8 characters', status: 400 }, false);

            const findUser = await UserModel.findOne({ email });

            if (findUser) return done({ message:'User already exist', status: 409 }, false)

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