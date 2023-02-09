require('dotenv').config()

const App = require('./app')
const express = require('express')
const HealthCheck = require('./controllers/healthCheck')
const morgan = require('./middlewares/loggers/morgan')
const errorHandler = require('./middlewares/errorHandler')

const createApp = () => {
    return new App({
        routes: [new HealthCheck('/health', 'api-health')],
        middlewares: [express.json(), morgan()],
        errorHandler
    })
}

module.exports = {
    app: createApp(),
    createApp
}