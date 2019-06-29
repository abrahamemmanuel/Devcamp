"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateRegisterInput;

function validateRegisterInput(name, email, password, password2) {
  var errors = []; // Check required fields

  if (!name || !email || !password || !password2) {
    errors.push({
      msg: 'Please fill in all fields'
    });
  } // Check if the length of name is less than min: 2 or greater than max: 30


  if (name.length < 2 || name.length > 30) {
    errors.push({
      msg: 'Name must be between 2 and 30 characters'
    });
  } // Check passwords match


  if (password !== password2) {
    errors.push({
      msg: 'Passwords do not match'
    });
  } // Check pass length


  if (password.length < 6) {
    errors.push({
      msg: 'Password should be at least 6 characters'
    });
  }

  return errors;
}
//# sourceMappingURL=register.js.map