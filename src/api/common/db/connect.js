const mongoose = require('mongoose')
const configuration = require('../configuration')

const getMongoUrl = () => {
    let MONGO_URL = ''
    const MONGO_DB_NAME = process.env.MONGO_DB_NAME
    const MONGO_USER = process.env.MONGO_USER
    const MONGO_PASSWORD = process.env.MONGO_PASSWORD
    const MONGO_HOST = process.env.MONGO_HOST
    const MONGO_QUERY = process.env.MONGO_QUERY

    if (!MONGO_USER) {
        return MONGO_URL = `mongodb://${process.env.MONGO_URI}/${MONGO_DB_NAME}`
    } else {
        return MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB_NAME}?${MONGO_QUERY}`
    }
}

const MongoConnect = async () => {
    await mongoose.set('strictQuery', false);

    await mongoose.connect(getMongoUrl(), configuration.mongo)
}

module.exports = {
    MongoConnect,
    getMongoUrl
}