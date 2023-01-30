const configuration = {
    mongo: {},
    globals: {
        env: process.env.NODE_ENV || 'production',
        port: process.env.PORT || 8080
    },
    api: {
        apiVersion: 'api/v1',
        greeting: () => `Server up and running in port: ${configuration.globals.port}`
    },
    morgan: 'tiny',
    session: {}
}

module.exports = configuration