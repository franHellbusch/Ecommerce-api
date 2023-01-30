const configuration = {
    mongo: {},
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
    session: {}
}

module.exports = configuration