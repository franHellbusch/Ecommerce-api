const express = require('express');
const { createServer } = require('http');
const configuration = require('./common/configuration');
const logger = require('./middlewares/loggers/winston')

class App {
    constructor(routes = [], middlewares = []) {
        this.app = express();
        this.server = createServer(this.app);
        this.port = configuration.globals.port;

        this.middlewares(middlewares);
        this.routes(routes);
        this.setViewEngine();
    }

    listen() {
        return this.server.listen(this.port, () => {
            logger.info(configuration.api.greeting());
        });
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

    setViewEngine() {
        this.app.set('views', configuration.views.viewsDir)
        this.app.set('view engine', configuration.views.viewEngine)
    }
}

module.exports = App