const passport = require("passport");
const { createError } = require("../common/httpError");
const BaseController = require("../containers/BaseController");
const UserDto = require("../dtos/user.dto");

class AuthController extends BaseController {
    constructor (path, service) {
        super(path, service);

        this.initRoutes()
        this.router.use(this.errorHandler)
    }

    initRoutes() {
        this.router.post(`${this.path}/login`, passport.authenticate('login', { failWithError: true }), this.login)
        this.router.post(`${this.path}/register`, passport.authenticate('register', { failWithError: true }), this.register)
        this.router.post(`${this.path}/logout`, this.logout)
    }

    async login(req, res, next) {
        try {
            const userDto = new UserDto(req.user).createDto()
            res.status(200).json({
                success: true,
                user: userDto
            })
        } catch (err) {
            next(createError(err))
        }
    }

    async register(req, res, next) {
        try {
            const userDto = new UserDto(req.user).createDto()
            res.status(201).json({
                success: true,
                user: userDto
            })
        } catch (err) {
            next(createError(err))
        }
    }

    async logout(req, res, next) {
        try {
            req.logOut(() => {
                res.status(200).json({
                    success: true,
                    message: 'Successfully logged out'
                })
            })
        } catch (err) {
            next(createError(err))
        }
    }
}

module.exports = AuthController