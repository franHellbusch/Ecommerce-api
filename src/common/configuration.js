const configuration = {
    mongo: {},
    globals: {
        env: process.env.NODE_ENV || 'production',
        port: process.env.PORT || 8080
    },
    greeting: () => `Server up and running in port: ${configuration.globals.port}`,
    morgan: 'dev',
    session: {}
}

module.exports = configuration