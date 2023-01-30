const express = require('express');
const configuration = require('../common/configuration');
const httpStatus = require('http-status');

class HealthCheck {
    constructor(path) {
        this.router = express.Router()
        this.path = path

        this.initRoutes()
    }

    initRoutes() {
        this.router.get(`${this.path}`, this.healthCheck)
    }

    async healthCheck(_req, res, _next) {
        res.status(httpStatus.OK).json({
            environment: configuration.globals.env,
            status: httpStatus.OK,
            message: httpStatus['200_MESSAGE']
        })
    }
}

module.exports = HealthCheck