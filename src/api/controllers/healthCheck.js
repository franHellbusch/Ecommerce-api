const configuration = require('../common/configuration');
const httpStatus = require('http-status');
const { createError } = require('../common/httpError');
const BaseController = require('../containers/BaseController');

class HealthCheck extends BaseController {
    constructor(path, service) {
        super(path, service)

        this.initRoutes()
        this.router.use(this.errorHandler)
    }

    initRoutes() {
        this.router.get(`${this.path}`, this.healthCheck)
    }

    async healthCheck(_req, res, next) {
        try {
            res.status(httpStatus.OK).json({
                environment: configuration.globals.env,
                status: httpStatus.OK,
                message: httpStatus['200_MESSAGE']
            })
        } catch (error) {
            next(createError(error))
        }
    }
}

module.exports = HealthCheck