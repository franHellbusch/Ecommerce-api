require('dotenv').config()

const App = require('./app')
const express = require('express')
const HealthCheck = require('./controllers/healthCheck')
const morgan = require('./middlewares/loggers/morgan')

const createApp = () => {
    return new App(
        routes = [new HealthCheck('/health')],
        middlewares = [ express.json(), morgan() ]
    )
}

module.exports = {
    app: createApp(),
    createApp
}