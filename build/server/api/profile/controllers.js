"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Profile = _interopRequireDefault(require("../../..//database/models/Profile"));

var _User = _interopRequireDefault(require("../../..//database/models/User"));

var _profile = _interopRequireDefault(require("../../../utils/validation/profile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ProfileCoontroller =
/*#__PURE__*/
function () {
  function ProfileCoontroller() {
    _classCallCheck(this, ProfileCoontroller);
  }

  _createClass(ProfileCoontroller, [{
    key: "getCurrentUserProfile",
    value: function getCurrentUserProfile(req, res) {
      var errors = {};

      _Profile.default.findOne({
        user: req.user.id
      }).populate('user', ['name', 'avatar']).then(function (profile) {
        if (!profile) {
          // Add to the errors object
          errors.noprofile = "You don't have a profile yet";
          return res.status(400).render('create-profile', {
            errors: errors
          });
        } else {
          return res.status(200).render('private-profile', {
            profile: profile
          });
        }
      }).catch(function (err) {
        return res.status(501).json(err);
      });
    }
  }, {
    key: "editProfile",
    value: function editProfile(req, res) {
      _Profile.default.findOne({
        user: req.user.id
      }).populate('user', ['name', 'avatar']).then(function (profile) {
        return res.status(200).render('edit-profile', {
          profile: profile
        });
      });
    }
  }, {
    key: "createUserProfile",
    value: function createUserProfile(req, res) {
      var _validateProfileInput = (0, _profile.default)(req.body),
          errors = _validateProfileInput.errors,
          isValid = _validateProfileInput.isValid; // Check validation


      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).redirect('/api/profile', {
          errors: errors
        });
      } // Get fields


      var profileFields = {};
      profileFields.user = req.user.id;
      if (req.body.handle) profileFields.handle = req.body.handle;
      if (req.body.company) profileFields.company = req.body.company;
      if (req.body.website) profileFields.website = req.body.website;
      if (req.body.location) profileFields.location = req.body.location;
      if (req.body.bio) profileFields.bio = req.body.bio;
      if (req.body.status) profileFields.status = req.body.status;
      if (req.body.githubusername) profileFields.githubusername = req.body.githubusername; // Skills split into array

      if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
      } // Social


      profileFields.social = {};
      if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
      if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
      if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
      if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
      if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

      _Profile.default.findOne({
        user: req.user.id
      }).populate('user', ['name', 'avatar']).then(function (profile) {
        if (profile) {
          // Update
          _Profile.default.findOneAndUpdate({
            user: req.user.id
          }, {
            $set: profileFields
          }, {
            new: true
          }).then(function (profile) {
            return res.status(200).render('edit-profile', {
              profile: profile
            });
          });
        } else {
          //Create
          // Check if handle exist
          _Profile.default.findOne({
            handle: profileFields.handle
          }).then(function (profile) {
            if (profile) {
              // Add to errors
              errors.handle = 'That handle already exist';
              return res.status(400).render('create-profile', {
                errors: errors
              });
            } // Save Profile


            new _Profile.default(profileFields).save().then(function (profile) {
              return res.status(200).render('private-profile', {
                profile: profile
              });
            });
          });
        }
      });
    }
  }, {
    key: "getExperiencePage",
    value: function getExperiencePage(req, res) {
      res.status(200).render('add-experience');
    }
  }, {
    key: "getEducationPage",
    value: function getEducationPage(req, res) {
      res.status(200).render('add-education');
    }
  }]);

  return ProfileCoontroller;
}();

var profileController = new ProfileCoontroller();
var _default = profileController;
exports.default = _default;
//# sourceMappingURL=controllers.js.map