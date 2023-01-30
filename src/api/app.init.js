require('dotenv').config()

const App = require('./app')
const morgan = require('./middlewares/loggers/morgan')

const createApp = () => {
    return new App(
        routes = [],
        middlewares = [ morgan() ]
    )
}

module.exports = {
    app: createApp(),
    createApp
}