const express = require('express');
const { createServer } = require('http');
const configuration = require('./common/configuration');
const { MongoConnect } = require('./common/db/connect');
const logger = require('./middlewares/loggers/winston')

class App {
    constructor({ routes = [], middlewares = [], passportService, errorHandler }) {
        this.app = express();
        this.server = createServer(this.app);
        this.port = configuration.globals.port;
        this.errorHandler = errorHandler

        this.dbConnection()
        this.passportService(passportService);
        this.middlewares(middlewares);
        this.routes(routes);
        this.setViewEngine();
        this.setErrorHandler();
    }

    listen() {
        return this.server.listen(this.port, () => {
            logger.info(configuration.api.greeting());
        });
    }

    dbConnection() {
        MongoConnect()
            .then(() => logger.info('MongoDB connection established'))
            .catch((err) => logger.fatal(err))
    }

    routes(controllers = []) {
        controllers.forEach(controller => {
            this.app.use(configuration.api.apiVersion, controller.router)
        })
    }

    middlewares(middlewares = []) {
        middlewares.forEach(middleware => {
            this.app.use(middleware)
        })
    }

    passportService(passportServiceInstance) {
        passportServiceInstance();
    }

    setErrorHandler() {
        this.app.use(this.errorHandler)
    }

    setViewEngine() {
        this.app.set('views', configuration.views.viewsDir)
        this.app.set('view engine', configuration.views.viewEngine)
    }
}

module.exports = App