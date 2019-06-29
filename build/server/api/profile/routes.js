"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../../config/auth");

var _controllers = _interopRequireDefault(require("./controllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var profileRouter = _express.default.Router(); // @route     /api/profile
// @descr     Get users profile
// @acces     Private
// @methd     GET


profileRouter.get('/api/profile', _auth.ensureAuthenticated, _controllers.default.getCurrentUserProfile); // @route     /api/profile
// @descr     Create or Edit users profile
// @acces     Private
// @methd     POST

profileRouter.post('/api/profile', _auth.ensureAuthenticated, _controllers.default.createUserProfile); // @route     /api/edit-profile
// @descr     Create or Edit users profile
// @acces     Private
// @methd     POST

profileRouter.get('/api/edit-profile', _auth.ensureAuthenticated, _controllers.default.editProfile); // @route     /api/profile/exprience
// @descr     Get add experience
// @acces     Private
// @methd     GET

profileRouter.get('/api/profile/experience', _auth.ensureAuthenticated, _controllers.default.getExperiencePage); // @route     /api/profile/education
// @descr     Get add education
// @acces     Private
// @methd     GET

profileRouter.get('/api/profile/education', _auth.ensureAuthenticated, _controllers.default.getEducationPage);
var _default = profileRouter;
exports.default = _default;
//# sourceMappingURL=routes.js.map