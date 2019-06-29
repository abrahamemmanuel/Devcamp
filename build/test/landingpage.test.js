"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _server = _interopRequireDefault(require("../server/server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('landingpage', function () {
  it('Welcomes the user to the landingpage', function (done) {
    (0, _supertest.default)(_server.default).get('/').expect(200).expect(/Create a developer profile & portfolio, share posts and get help from other developers/, done);
  });
});
//# sourceMappingURL=landingpage.test.js.map