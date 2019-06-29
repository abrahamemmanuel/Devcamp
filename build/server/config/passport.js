"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _User = _interopRequireDefault(require("../../database/models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LocalStrategy = require('passport-local').Strategy; // Load User model


module.exports = function (passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, function (email, password, done) {
    // Match user
    _User.default.findOne({
      email: email
    }).then(function (user) {
      if (!user) {
        return done(null, false, {
          message: 'That email is not registered'
        });
      } // Match password


      _bcryptjs.default.compare(password, user.password, function (err, isMatch) {
        if (err) throw err;

        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: 'Password incorrect'
          });
        }
      });
    });
  }));
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    _User.default.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
//# sourceMappingURL=passport.js.map