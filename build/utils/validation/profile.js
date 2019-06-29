"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateProfileInput;

var _validator = _interopRequireDefault(require("validator"));

var _isEmpty = _interopRequireDefault(require("./isEmpty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateProfileInput(data) {
  // Initialize an empty object errors variable
  var errors = {};
  data.handle = !(0, _isEmpty.default)(data.handle) ? data.handle : '';
  data.status = !(0, _isEmpty.default)(data.status) ? data.status : '';
  data.skilss = !(0, _isEmpty.default)(data.skills) ? data.skills : '';

  if (!_validator.default.isLength(data.handle, {
    min: 2,
    max: 40
  })) {
    errors.handle = 'Handle needs to be between 2 and 40 characters';
  }

  if (_validator.default.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }

  if (_validator.default.isEmpty(data.skills)) {
    errors.skills = 'Skills field handle is required';
  }

  if (!(0, _isEmpty.default)(data.website)) {
    if (!_validator.default.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

  if (!(0, _isEmpty.default)(data.youtube)) {
    if (!_validator.default.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }

  if (!(0, _isEmpty.default)(data.twitter)) {
    if (!_validator.default.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }

  if (!(0, _isEmpty.default)(data.facebook)) {
    if (!_validator.default.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }

  if (!(0, _isEmpty.default)(data.linkedin)) {
    if (!_validator.default.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }

  if (!(0, _isEmpty.default)(data.instagram)) {
    if (!_validator.default.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty.default)(errors)
  };
}
//# sourceMappingURL=profile.js.map