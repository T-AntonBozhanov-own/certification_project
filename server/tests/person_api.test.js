require('dotenv').config();
const {closeConnection} = require('../config/mongodb')
const server = require('../server')
const { PERSON_PATH } = require('../routers/constants')
const session = require('supertest-session');
const {quizData} = require('./test_helper')

var testSession = null;
    
beforeEach(function () {
    testSession = session(server);
});

 afterAll(async () => {
    // Closes connection after all tests run
    await closeConnection()
    server.close()
  })

describe('GET test', () => {
  let authenticatedSession;

  beforeEach(function (done) {
    testSession.post('/api/login')
      .send({ username: 'user', password: '12345' })
      .expect(200)
      .end(function (err) {
        if (err) return done(err);
        authenticatedSession = testSession;
        return done();
      });
  });

  test('get person list', async () => {
    const res = await authenticatedSession.get(PERSON_PATH).expect(200);
    expect(res.body).toEqual([{
          id: "65fd40be41e16c3b72fd8ac2",
          user: "65fd40be41e16c3b72fd8ac0",
          username: "user"
    }]);
    })
  test('get person by name', async () => {
      const res = await authenticatedSession.get(`${PERSON_PATH}/65fd40be41e16c3b72fd8ac2`).expect(200);
      expect(res.body).toEqual({
        id: "65fd40be41e16c3b72fd8ac2",
        user: "65fd40be41e16c3b72fd8ac0",
        username: "user"
    });
    })  
})

