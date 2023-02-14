const httpStatus = require("http-status")
const { createError } = require("../common/httpError")

const handleMongoError = (err) => {
    if (err.name == 'CastError') {
        return createError(err, 400)
    }
    if (err.code == 11000) {
        return createError(err, httpStatus.CONFLICT)
    }
    if (err.message == 'Not Found') {
        return createError(err, httpStatus.NOT_FOUND)
    }

    return createError(err)
}

module.exports = handleMongoError