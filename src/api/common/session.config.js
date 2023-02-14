const MongoStore = require('connect-mongo');
const { getMongoUrl } = require('./db/connect');
const configuration = require('./configuration');

const sessionConfig = {
    store: MongoStore.create({
        mongoUrl: getMongoUrl(),
        mongoOptions: configuration.mongo,
        ttl: 600
    }),
    ...configuration.session
}

module.exports = sessionConfig