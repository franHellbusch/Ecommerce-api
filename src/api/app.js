const express = require('express');
const { createServer } = require('http');
const configuration = require('./common/configuration');

class App {
    constructor(routes = [], middlewares = [], viewEngine = { viewsDir: '../views', engine: 'ejs' }) {
        this.app = express();
        this.server = createServer(this.app);
        this.port = configuration.globals.port;

        this.routes(routes);
        this.middlewares(middlewares);
        this.setViewEngine(viewEngine);
    }

    listen() {
        return this.server.listen(this.port, () => {
            console.log(configuration.api.greeting());
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

    setViewEngine({ viewsDir, engine }) {
        this.app.set('views', viewsDir)
        this.app.set('view engine', engine)
    }
}

module.exports = App