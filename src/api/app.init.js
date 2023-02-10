require('dotenv').config()

const App = require('./app')
const express = require('express')
const HealthCheck = require('./controllers/healthCheck')
const morgan = require('./middlewares/loggers/morgan')
const errorHandler = require('./middlewares/errorHandler')
const MongoConnect = require('./common/db/connect')
const { logger } = require('./middlewares/loggers/winston')

const createApp = () => {
    MongoConnect()
    .then(() => logger.info('MongoDB connection established'))
    .catch((err) => logger.fatal(err))

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