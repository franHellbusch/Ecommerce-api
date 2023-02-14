const handleMongoError = require("../helpers/handleMongoError");

class ServiceContainer {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        try {
            return await this.model.find()
        } catch (err) {
            throw handleMongoError(err)
        }
    }

    async getById(id) {
        try {
            const data = await this.model.findById(id);

            if (!findData) throw new Error('Not found')

            return data
        } catch (err) {
            throw handleMongoError(err)
        }
    }

    async save(object) {
        try {
            const newProduct = new this.model(object)
            return await newProduct.save()
        } catch (err) {
            throw handleMongoError(err)
        }
    }

    async deleteById(id) {
        try {
            const deleted = await this.model.findByIdAndDelete(id)

            if (!deleted) throw new Error('Not found')

            return deleted
        } catch (err) {
            throw handleMongoError(err)
        }
    }
}

module.exports = ServiceContainer