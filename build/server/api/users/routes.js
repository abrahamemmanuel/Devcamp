"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../../config/auth");

var _controllers = _interopRequireDefault(require("./controllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRouter = _express.default.Router(); // @route     /users/login
// @descr     Get user Login page
// @acces     Public
// @methd     GET


userRouter.get('/api/users/login', _controllers.default.getLoginPage); // @route     /users/register
// @descr     Get user signup page
// @acces     Public
// @methd     GET

userRouter.get('/api/users/register', _controllers.default.getSignUpPage); // @route     /users/register
// @descr     Register new user
// @acces     Private
// @methd     POST

userRouter.post('/api/users/register', _controllers.default.registerUser); // @route     /users/login
// @descr     Login user
// @acces     Private
// @methd     POST

userRouter.post('/api/users/login', _controllers.default.login); // @route     /api/users/updateAuth
// @descr     Update user loggin status
// @acces     Private
// @methd     UPDATE

userRouter.get('/api/users/updateAuth', _auth.ensureAuthenticated, _controllers.default.isLoggedIn); // @route   '/logout
// @desc     Logout User
// @access   Private
// @method   POST

userRouter.get('/api/logout', _controllers.default.logout); // @route   '/index
// @desc     Logout User
// @access   Private
// @method   GET

userRouter.get('/index', _auth.ensureAuthenticated, _controllers.default.getIndexPage);
var _default = userRouter;
exports.default = _default;
//# sourceMappingURL=routes.js.map