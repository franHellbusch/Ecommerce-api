require('dotenv').config()

const App = require('./app')

const createApp = () => {
    return new App()
}

module.exports = {
    app: createApp()
}