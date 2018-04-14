require('dotenv').config();
const superagent = require('superagent');
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

describe('Test engine routes', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  describe('Handle token less requests', () => {
    test(`sends 401 for GET requests if no token was provided`, done => {
      superagent
        .get(SERVER_URL + '/api/engines').catch(err => {
          if (err) {
            expect(err.status).toBe(401);
            done();
          }
        });
    });

    test('sends 401 for POST requests if no token was provided', done => {
      let newEngine = {
        ftl: true,
        stl: true
      }

      superagent
        .post(SERVER_URL + '/api/engines')
        .set('Content-Type', 'application/json')
        .send(newEngine)
        .end((err, res) => {
          if (err) {
            expect(res.status).toBe(401);
            done();
          }
        });
    });

    test('sends 401 for PUT requests if no token was provided', done => {
      let newUser = getUserParams();
      let engineId;
      let userId;

      superagent
        .post(SERVER_URL + '/api/users')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(newUser))
        .end((err, res) => {
          if (err) throw err;
          userId = res.body._id;

          superagent
            .get(SERVER_URL + '/api/signin')
            .set('Content-Type', 'application/json')
            .auth(newUser.username, newUser.password)
            .end((err, res) => {
              if (err) throw err;

              let newEngine = {
                ftl: true,
                stl: true
              };

              let token = res.body.token;

              superagent
                .post(SERVER_URL + '/api/engines')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send(JSON.stringify(newEngine))
                .end((err, res) => {
                  if (err) throw err;

                  let engineId = res.body._id;
                  let updatedEngine = {
                    ftl: true,
                    stl: true
                  }

                  superagent
                    .put(SERVER_URL + '/api/engine/' + engineId)
                    .set('Content-Type', 'application/json')
                    .send(updatedEngine)
                    .end((err, res) => {
                      if (err) {
                        expect(res.status).toBe(401);
                        done();
                      }
                    });
                });
            });
        });
    });
  });

  describe('Handle valid authorization', () => {
    test('sends 200 for a get request with valid authorization', done => {
      let newUser = getUserParams();
      let userId;
      let token;

      superagent
        .post(SERVER_URL + '/api/users')
        .set('Content-Type', 'application/json')
        .auth(newUser.username, newUser.password)
        .send(JSON.stringify(newUser))
        .end((err, res) => {
          if (err) throw err;

          userId = res.body._id;

          superagent
            .get(SERVER_URL + '/api/signin')
            .set('Content-Type', 'application/json')
            .auth(newUser.username, newUser.password)
            .end((err, res) => {
              if (err) throw err;

              token = res.body.token;

              superagent
                .get(SERVER_URL + '/api/engines')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .end((err, res) => {
                  if (err) throw err;
                  expect(res.status).toBe(200);
                  done();
                });
            });
        });
    });

    test('sends 200 for a get request for one item with valid authorization', done => {
      let newUser = getUserParams();
      let userId;
      let token;

      superagent
        .post(SERVER_URL + '/api/users')
        .set('Content-Type', 'application/json')
        .auth(newUser.username, newUser.password)
        .send(JSON.stringify(newUser))
        .end((err, res) => {
          if (err) throw err;

          userId = res.body._id;

          superagent
            .get(SERVER_URL + '/api/signin')
            .set('Content-Type', 'application/json')
            .auth(newUser.username, newUser.password)
            .end((err, res) => {
              if (err) throw err;

              let newEngine = {
                ftl: true,
                stl: true
              };

              token = res.body.token;

              superagent
                .post(SERVER_URL + '/api/engines')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send(JSON.stringify(newEngine))
                .end((err, res) => {
                  if (err) throw err;

                  let engineId = res.body._id;

                  superagent
                    .get(SERVER_URL + '/api/engine/' + engineId)
                    .set('Authorization', 'Bearer ' + token)
                    .end((err, res) => {
                      if (err) console.log(err.message);
                      expect(res.status).toBe(200);
                      done();
                    });
                });
            });
        });
    });

    test('sends 200 for a put request with a valid authorization and body', done => {
      let newUser = getUserParams();
      let userId;
      let token;

      superagent
        .post(SERVER_URL + '/api/users')
        .set('Content-Type', 'application/json')
        .auth(newUser.username, newUser.password)
        .send(JSON.stringify(newUser))
        .end((err, res) => {
          if (err) throw err;

          userId = res.body._id;

          superagent
            .get(SERVER_URL + '/api/signin')
            .set('Content-Type', 'application/json')
            .auth(newUser.username, newUser.password)
            .end((err, res) => {
              if (err) throw err;

              let newEngine = {
                ftl: true,
                stl: true
              };

              token = res.body.token;

              superagent
                .post(SERVER_URL + '/api/engines')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send(JSON.stringify(newEngine))
                .end((err, res) => {
                  if (err) throw err;

                  let engineId = res.body._id;
                  let updatedEngine = {
                    ftl: true,
                    stl: true
                  }

                  superagent
                    .put(SERVER_URL + '/api/engine/' + engineId)
                    .set('Content-Type', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send(updatedEngine)
                    .end((err, res) => {
                      if (err) console.log(err);
                      expect(res.status).toBe(200);
                      done();
                    });
                });
            });
        });
    });

    test('sends 200 for a delete request with a valid authorization and body', done => {
      let newUser = getUserParams();
      let userId;
      let token;

      superagent
        .post(SERVER_URL + '/api/users')
        .set('Content-Type', 'application/json')
        .auth(newUser.username, newUser.password)
        .send(JSON.stringify(newUser))
        .end((err, res) => {
          if (err) throw err;

          userId = res.body._id;

          superagent
            .get(SERVER_URL + '/api/signin')
            .set('Content-Type', 'application/json')
            .auth(newUser.username, newUser.password)
            .end((err, res) => {
              if (err) throw err;

              let newEngine = {
                ftl: true,
                stl: true
              };

              token = res.body.token;

              superagent
                .post(SERVER_URL + '/api/engines')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send(JSON.stringify(newEngine))
                .end((err, res) => {
                  if (err) throw err;

                  let engineId = res.body._id;
                  superagent
                    .delete(SERVER_URL + '/api/engine/' + engineId)
                    .set('Content-Type', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .end((err, res) => {
                      if (err) console.log(err);
                      expect(res.status).toBe(200);
                      done();
                    });
                });
            });
        });
    });

    test('sends 200 for a post request with a valid authorization and body', done => {
      let newUser = getUserParams();
      let userId;
      let token;

      superagent
        .post(SERVER_URL + '/api/users')
        .set('Content-Type', 'application/json')
        .auth(newUser.username, newUser.password)
        .send(JSON.stringify(newUser))
        .end((err, res) => {
          if (err) throw err;

          userId = res.body._id;

          superagent
            .get(SERVER_URL + '/api/signin')
            .set('Content-Type', 'application/json')
            .auth(newUser.username, newUser.password)
            .end((err, res) => {
              if (err) throw err;

              let newEngine = {
                ftl: true,
                stl: true
              };

              token = res.body.token;

              superagent
                .post(SERVER_URL + '/api/engines')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send(JSON.stringify(newEngine))
                .end((err, res) => {
                  if (err) throw err;
                  expect(res.status).toBe(200);
                  done();
                });
            });
        });
    });
  });
});
