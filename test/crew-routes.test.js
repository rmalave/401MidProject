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

describe('Test crew routes', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  describe('Handle token less requests', () => {
    test(`sends 401 for GET requests if no token was provided`, done => {
      superagent
        .get(SERVER_URL + '/api/crew').catch(err => {
          if (err) {
            expect(err.status).toBe(401);
            done();
          }
        });
    });

    test('sends 401 for POST requests if no token was provided', done => {
      let newCrew = {
        name: 'crew member'
      }

      superagent
        .post(SERVER_URL + '/api/crew')
        .set('Content-Type', 'application/json')
        .send(newCrew)
        .end((err, res) => {
          if (err) {
            expect(res.status).toBe(401);
            done();
          }
        });
    });

    test('sends 401 for PUT requests if no token was provided', done => {
      let newUser = getUserParams();
      let crewId;
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

              let newCrew = {
                name: 'I am a new crew member!',
                title: 'officer'
              };

              let token = res.body.token;
              console.log(token);

              superagent
                .post(SERVER_URL + '/api/crew')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send(JSON.stringify(newCrew))
                .end((err, res) => {
                  if (err) throw err;

                  let crewId = res.body._id;
                  let updatedCrew = {
                    name: 'New name!',
                    title: 'officer'
                  }

                  superagent
                    .put(SERVER_URL + '/api/crew/' + crewId)
                    .set('Content-Type', 'application/json')
                    .send(updatedCrew)
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

              let newCrew = {
                name: 'I am a new crew member!'
              };

              token = res.body.token;

              superagent
                .post(SERVER_URL + '/api/crew')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .send(JSON.stringify(newCrew))
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
