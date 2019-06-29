"use strict";

module.exports = {
  ensureAuthenticated: function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/api/users/login');
  }
};
//# sourceMappingURL=auth.js.map