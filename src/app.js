const express = require('express');
const { createServer } = require('http');
const configuration = require('./common/configuration');

class App {
    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.port = configuration.globals.port;
    }

    listen() {
        return this.server.listen(this.port, () => {
            console.log(configuration.greeting());
        });
    }
}

module.exports = App