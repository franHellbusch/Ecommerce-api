const WinstonConfig = require("./winston.config")

const configuration = {
    mongo: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    globals: {
        env: process.env.NODE_ENV || 'production',
        port: process.env.PORT || 8080
    },
    api: {
        greeting: () => `Server up and running in port: ${configuration.globals.port}`,
        apiVersion: '/api/v1',
    },
    views: {
        viewsDir: '/src/views',
        viewEngine: 'ejs'
    },
    morgan: 'tiny',
    winston: WinstonConfig,
    session: {
        secret: process.env.SECRET || 'sh',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: false,
            secure: false
        }
    }
}

module.exports = configuration