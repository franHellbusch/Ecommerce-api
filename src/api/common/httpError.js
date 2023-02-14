const httpStatus = require("http-status")

class HttpError extends Error {
    constructor({ message, status, stack }) {
        super(message)

        this.status = isNaN(status) ? parseInt(status) : status
        this.statusCode = this.status
        this.stack = stack || 'unknown path error'

        if (this.statusCode >= 500) {
            this.message = httpStatus[this.status]
        }
    }
}

function createError(err, sts) {
    const status = sts || 500
    const message = err.message || httpStatus[status]
    const stack = err.stack ? err.stack.split("\n")[1] : 'unknown path error';

    if (err instanceof HttpError) return err

    if (err instanceof Error) {
        const genericError = {
            message,
            status,
            stack
        }
        return new HttpError(genericError)
    }

    return new HttpError({
        message,
        status,
        stack
    })
}

module.exports = { HttpError, createError }