const logger = require("./loggers/winston");

const errorHandler = (err, _req, res, _next) => {
    err.status <= 500 ?
        logger.error(err.message, err) :
        logger.fatal(err.message, err)

    return res.status(err.status).json({
        success: false,
        message: err.message,
        ...err
    })
}

module.exports = errorHandler