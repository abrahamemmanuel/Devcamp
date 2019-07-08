"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _gravatar = _interopRequireDefault(require("gravatar"));

var _User = _interopRequireDefault(require("../../../database/models/User"));

var _Profile = _interopRequireDefault(require("../../../database/models/Profile"));

var _register = _interopRequireDefault(require("../../../utils/validation/register"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, [{
    key: "getIndexPage",
    value: function getIndexPage(req, res) {
      res.status(200).render('index', {
        user: req.user
      });
    }
  }, {
    key: "getLoginPage",
    value: function getLoginPage(req, res) {
      res.status(200).render('login');
    }
  }, {
    key: "getSignUpPage",
    value: function getSignUpPage(req, res) {
      res.status(200).render('register');
    }
  }, {
    key: "registerUser",
    value: function registerUser(req, res) {
      var _req$body = req.body,
          name = _req$body.name,
          email = _req$body.email,
          password = _req$body.password,
          password2 = _req$body.password2;
      var errors = (0, _register.default)(name, email, password, password2);

      if (errors.length > 0) {
        res.status(404).render('register', {
          errors: errors,
          name: name,
          email: email,
          password: password,
          password2: password2
        });
      } else {
        // Validation passed
        _User.default.findOne({
          email: email
        }).then(function (user) {
          if (user) {
            // User exists
            errors.push({
              msg: 'User already exist with this email'
            });
            res.status(404).render('register', {
              errors: errors,
              name: name,
              email: email,
              password: password,
              password2: password2
            });
          } else {
            var avatar = _gravatar.default.url(req.body.email, {
              s: '200',
              // Size
              r: 'pg',
              //Rating
              d: 'mm' // Default

            });

            var newUser = new _User.default({
              name: name,
              email: email,
              avatar: avatar,
              password: password
            }); // Hash password

            _bcryptjs.default.genSalt(10, function (err, salt) {
              return _bcryptjs.default.hash(newUser.password, salt, function (err, hash) {
                if (err) throw err; // Set password to hashed

                newUser.password = hash; // Save user

                newUser.save().then(function (user) {
                  req.flash('success_msg', 'You are now registered and can log in');
                  res.redirect('/api/users/login');
                }).catch(function (err) {
                  return console.log(err);
                });
              });
            });
          }
        });
      }
    }
  }, {
    key: "login",
    value: function login(req, res, next) {
      _passport.default.authenticate('local', {
        successRedirect: '/api/users/updateAuth',
        failureRedirect: '/api/users/login',
        failureFlash: true
      })(req, res, next);
    }
  }, {
    key: "logout",
    value: function logout(req, res) {
      var id = req.user.id; // Find logged in user by id and update isLogin value

      _User.default.findByIdAndUpdate(id, {
        $set: {
          isLogin: false
        }
      }, {
        new: true
      }).then(function (user) {
        return res.status(200);
      }).catch(function (err) {
        return console.log(err);
      });

      req.logout();
      req.flash('success_msg', 'You are logged out');
      res.redirect('/api/users/login');
    }
  }, {
    key: "isLoggedIn",
    value: function isLoggedIn(req, res) {
      _User.default.findByIdAndUpdate(req.user.id, {
        $set: {
          isLogin: true
        }
      }, {
        new: true
      }).then(function (user) {
        return res.status(200).redirect('/api/profile/dashboard');
      }).catch(function (err) {
        return console.log(err);
      });
    }
  }]);

  return UserController;
}();

var userController = new UserController();
var _default = userController;
exports.default = _default;
//# sourceMappingURL=controllers.js.map