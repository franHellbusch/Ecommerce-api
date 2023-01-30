const winston = require("winston")
const configuration = require("../../common/configuration")

class Logger {
    constructor() {
        const prodTransport = new winston.transports.File(configuration.winston.errorsFile)

        const transport = new winston.transports.Console({
            format: configuration.winston.formatter
        })

        this.logger = winston.createLogger({
            level: 'trace',
            levels: configuration.winston.customLevels.levels,
            transports: [transport, prodTransport]
        })
        winston.addColors(configuration.winston.customLevels.colors)
    }

    trace(msg, meta = '') {
        this.logger.log('trace', msg, meta)
    }

    debug(msg, meta) {
        this.logger.debug(msg, meta);
    }

    info(msg, meta) {
        this.logger.info(msg, meta);
    }

    warn(msg, meta) {
        this.logger.warn(msg, meta);
    }

    error(msg, meta) {
        this.logger.error(msg, meta);
    }

    fatal(msg, meta) {
        this.logger.log('fatal', msg, meta);
    }
}

module.exports = new Logger()