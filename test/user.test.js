require('dotenv').config();
const superagent = require('superagent');
const btoa = require('btoa');
const PORT = process.env.PORT;
const SERVER_URL = 'http://localhost:' + PORT;
const SIGNUP_URL = SERVER_URL + '/api/users';
const SIGNIN_URL = SERVER_URL + '/api/signin';
const server = require('../server.js');

function getUserParams() {
  // using + Math.rabdom() to avoid duplicate user errors
  return {
    username: 'bill' + Math.random(),
    password: 'windows95'
  };
}

jest.setTimeout(20000);

describe('Test basic auth', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  describe('Bad requests', () => {
    it('should return status 400 with bad request body on POST', done => {
      let params = {
        user: 'badpropery'
      };

      superagent
        .post(SIGNUP_URL)
        .set('Content-Type', 'application/json')
        .send(params)
        .catch(err => {
          expect(err.status).toEqual(400);
          done();
        });
    });

    it('should return status 400 with duplicate value POST', done => {
      let params = getUserParams();

      superagent
        .post(SIGNUP_URL)
        .set('Content-Type', 'application/json')
        .send(params)
        .then(res => {

          let newUser = {
            username: res.body.username,
            password: '12345'
          }

          superagent
            .post(SIGNUP_URL)
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(newUser))
            .catch(err => {
              expect(err.status).toEqual(400);
              done();
            });
        });
    });
  })

  describe('/api/users', () => {
    it('should return status 200 with successful request', done => {
      let params = getUserParams();

      superagent
        .post(SIGNUP_URL)
        .set('Content-Type', 'application/json')
        .send(params)
        .then(res => {
          expect(res.status).toEqual(200);
          done();
        });
    });
  });

  describe('/api/signin', () => {
    it('should return 401 unauthorized if password is incorrect', done => {
      let params = getUserParams();

      superagent
        .post(SIGNUP_URL)
        .set('Content-Type', 'application/json')
        .send(params)
        .then(res => {
          expect(res.status).toEqual(200);

          // intentionally set the password as a wrong password
          let payload = params['username'] + ':' + 'wrongpassword';
          let encoded = btoa(payload);

          return superagent
            .get(SIGNIN_URL)
            .set('Authorization', 'Basic ' + encoded);
        })
        .catch(err => {
          expect(err.status).toEqual(401);
          done();
        });
    });

    it('should return 200 if username and password are valid', done => {
      let params = getUserParams();

      superagent
        .post(SIGNUP_URL)
        .set('Content-Type', 'application/json')
        .send(params)
        .then(res => {
          expect(res.status).toEqual(200);

          let payload = params['username'] + ':' + params['password'];
          let encoded = btoa(payload);

          superagent
            .get(SIGNIN_URL)
            .set('Authorization', 'Basic ' + encoded)
            .auth(params['username'], params['password'])
            .then(res => {
              expect(res.status).toEqual(200);
              done();
            })
            .catch(err => console.err(err));
        })
    });

    it('should return 200 valid PUT request', done => {
      let params = getUserParams();

      superagent
        .post(SIGNUP_URL)
        .set('Content-Type', 'application/json')
        .send(params)
        .then(res => {

          let payload = params['username'] + ':' + params['password'];
          let encoded = btoa(payload);

          let userId = res.body._id;
          let updatedUser = {
            username: 'new username' + Math.random()
          };

          superagent
            .put(SERVER_URL + '/api/user/' + userId)
            .send(updatedUser)
            .then(res => {
              expect(res.status).toEqual(200);
              done();
            })
            .catch(err => console.log(err));
        })
    });

    it('should return 200 valid DELETE request', done => {
      let params = getUserParams();

      superagent
        .post(SIGNUP_URL)
        .set('Content-Type', 'application/json')
        .send(params)
        .then(res => {

          let payload = params['username'] + ':' + params['password'];
          let encoded = btoa(payload);

          let userId = res.body._id;

          superagent
            .delete(SERVER_URL + '/api/user/' + userId)
            .then(res => {
              expect(res.status).toEqual(200);
              done();
            })
            .catch(err => console.log(err));
        })
    });

    it('should return 200 valid DELETE request', done => {
      let params = getUserParams();

      superagent
        .post(SIGNUP_URL)
        .set('Content-Type', 'application/json')
        .send(params)
        .then(res => {

          let payload = params['username'] + ':' + params['password'];
          let encoded = btoa(payload);

          let userId = res.body._id;

          superagent
            .delete(SERVER_URL + '/api/user/' + userId)
            .then(res => {
              expect(res.status).toEqual(200);
              done();
            })
            .catch(err => console.log(err));
        })
    });

    it('should return 200 valid GET request for one user', done => {
      let params = getUserParams();

      superagent
        .post(SIGNUP_URL)
        .set('Content-Type', 'application/json')
        .send(params)
        .then(res => {

          let payload = params['username'] + ':' + params['password'];
          let encoded = btoa(payload);

          let userId = res.body._id;

          superagent
            .get(SERVER_URL + '/api/user/' + userId)
            .then(res => {
              expect(res.status).toEqual(200);
              done();
            })
            .catch(err => console.log(err));
        })
    });
  });
});
