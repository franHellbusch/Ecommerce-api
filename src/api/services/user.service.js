const ServiceContainer = require("../containers/service.container");
const { UserModel } = require("../models/user.model");

class UserService extends ServiceContainer {
    constructor() {
        super(UserModel)
    }
}

module.exports = new UserService()