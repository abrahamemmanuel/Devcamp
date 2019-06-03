import request from 'supertest';
import app from '../server/server';

describe('landingpage', () => {
  it('Welcomes the user to the landingpage', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect(/Create a developer profile & portfolio, share posts and get help from other developers/, done);
  });
});
