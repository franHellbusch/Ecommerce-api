const winston = require("winston")

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
    winston: {
        customLevels: {
            levels: {
                trace: 5,
                debug: 4,
                info: 3,
                warn: 2,
                error: 1,
                fatal: 0,
            },
            colors: {
                trace: 'white',
                debug: 'green',
                info: 'green',
                warn: 'yellow',
                error: 'red',
                fatal: 'red',
            },
        },
        formatter: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.splat(),
            winston.format.printf((info) => {
                const { timestamp, level, message, ...meta } = info;

                return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
            }),
        ),
        errorsFile: {
            filename: 'logs/error.log',
            level: 'error',
        }
    },
    session: {}
}

module.exports = configuration