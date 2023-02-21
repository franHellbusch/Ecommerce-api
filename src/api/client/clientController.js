const BaseController = require("../containers/BaseController");

class ClientController extends BaseController {
    constructor (path, service) {
        super(path, service);

        this.initRoutes()
        this.router.use(this.errorHandler)
    }

    initRoutes() {
        this.router.get(`${this.path}`, this.home)
        this.router.get(`${this.path}login`, this.login)
        this.router.get(`${this.path}register`, this.register)
    }

    async home(_req, res, _next) {
        res.render('pages/home')
    }

    async login(_req, res, _next) {
        res.render('pages/login')
    }

    async register(_req, res, _next) {
        res.render('pages/register')
    }
}

module.exports = ClientController;