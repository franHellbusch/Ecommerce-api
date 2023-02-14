require('dotenv').config()

const App = require('./app')
const express = require('express')
const HealthCheck = require('./controllers/healthCheck')
const morgan = require('./middlewares/loggers/morgan')
const errorHandler = require('./middlewares/errorHandler')
const session = require('express-session')
const sessionConfig = require('./common/session.config')
const passportService = require('./services/auth.service')
const passport = require('passport')
const AuthController = require('./controllers/AuthController')

const createApp = () => {
    return new App({
        routes: [
            new HealthCheck('/health', 'api-health'),
            new AuthController('/auth', 'api-auth')
        ],
        middlewares: [
            express.json(),
            morgan(),
            session(sessionConfig),
            passport.initialize(),
            passport.session(),
        ],
        passportService,
        errorHandler
    })
}

module.exports = {
    app: createApp(),
    createApp
}