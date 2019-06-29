"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _ejs = _interopRequireDefault(require("ejs"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectFlash = _interopRequireDefault(require("connect-flash"));

var _passport = _interopRequireDefault(require("passport"));

var _keys = _interopRequireDefault(require("./config/keys"));

var _routes = _interopRequireDefault(require("./api/users/routes"));

var _routes2 = _interopRequireDefault(require("./api/profile/routes"));

var _User = _interopRequireDefault(require("../database/models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create server
var app = (0, _express.default)(); // Passport Config

require('./config/passport')(_passport.default); // Set static folder


app.use(_express.default.static('public'));
app.use('/css', _express.default.static('public')); // Set View Engine

app.set('views', './views');
app.set('view engine', 'ejs'); // Bodyparser

app.use(_express.default.urlencoded({
  extended: true
})); // Express session

app.use((0, _expressSession.default)({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
})); // Passport middleware

app.use(_passport.default.initialize());
app.use(_passport.default.session()); // Connect flashhero

app.use((0, _connectFlash.default)()); // Global Vars

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
}); // DB Config

var db = process.env.MONGODB_URI || _keys.default.LOCALDB_URI; // Set useFindAndModify to false

_mongoose.default.set('useFindAndModify', false); // Connect to MongoDB


_mongoose.default.connect(db, {
  useNewUrlParser: true
}).then(function () {
  return console.log('MongoDB Connected...');
}).catch(function (err) {
  return console.log(err);
}); // eslint-disable-line no-console
// Load routes


app.use(_routes.default);
app.use(_routes2.default); // Get Landing page

app.get('/', function (req, res) {
  return res.status(200).render('landingpage');
});

if (!module.parent) {
  app.listen(_keys.default.env, function () {
    return console.log("Server running on port ".concat(_keys.default.env));
  });
} // eslint-disable-line no-console


var _default = app;
exports.default = _default;
//# sourceMappingURL=server.js.map