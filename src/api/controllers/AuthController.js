const passport = require("passport");
const { createError } = require("../common/httpError");
const BaseController = require("../containers/BaseController");

class AuthController extends BaseController {
    constructor(path, service) {
        super(path, service);

        this.initRoutes()
        this.router.use(this.errorHandler)
    }

    initRoutes() {
        this.router.post(`${this.path}/login`, this.login)
        this.router.post(`${this.path}/register`, this.register)
        this.router.post(`${this.path}/logout`, this.logout)
    }

    async login(req, res, next) {
        passport.authenticate('login', (err, user, info) => {
            if (err) {
                return next(createError(err, err.status));
            }
            if (!user) {
                return next(createError(info, 400));
            }
            res.redirect('/')
        })(req, res, next);
    }

    async register(req, res, next) {
        passport.authenticate('register', (err, user, info) => {
            if (err) {
                return next(createError(err, err.status));
            }
            if (!user) {
                return next(createError(info, 400));
            }
            res.redirect('/')
        })(req, res, next);
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