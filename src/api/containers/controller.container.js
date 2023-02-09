const express = require('express');

class BaseController {
    constructor (path, service) {
        this.path = path;
        this.service = service;
        this.router = express.Router()
    }

    errorHandler = (err, _req, _res, next) => {
        err.service = this.service
        next(err)
    }
}

module.exports = BaseController